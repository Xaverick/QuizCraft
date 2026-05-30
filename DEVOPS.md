# GeekClash — Full DevOps Runbook

## Architecture

```
GitHub push
    │
    ▼
Jenkins (pod in K8s)
    │  builds images in parallel (backend / client / admin)
    │  pushes to DockerHub
    ▼
kubectl apply (from Jenkins agent pod)
    │  stamps IMAGE_TAG into manifests
    ▼
Kubernetes cluster (kubeadm on VMs)
    ├── geekclash namespace  (app workloads)
    ├── jenkins namespace    (CI/CD)
    ├── monitoring namespace (Prometheus + Grafana)
    └── ingress-nginx        (TLS termination via cert-manager)
```

---

## Phase 1 — Provision VMs and install kubeadm

### Recommended VM layout

| Role | Count | Min spec |
|---|---|---|
| Control plane (master) | 1 | 2 vCPU, 4 GB RAM |
| Worker nodes | 2 | 2 vCPU, 4 GB RAM |

### On ALL nodes

```bash
# Disable swap (required by K8s)
swapoff -a
sed -i '/ swap / s/^/#/' /etc/fstab

# Load kernel modules
cat <<EOF | tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
modprobe overlay
modprobe br_netfilter

# Sysctl settings
cat <<EOF | tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
sysctl --system

# Install containerd
apt-get update && apt-get install -y containerd
mkdir -p /etc/containerd
containerd config default | tee /etc/containerd/config.toml
# Enable SystemdCgroup (required)
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
systemctl restart containerd && systemctl enable containerd

# Install kubeadm, kubelet, kubectl
apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key \
  | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' \
  | tee /etc/apt/sources.list.d/kubernetes.list
apt-get update && apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
```

### On the MASTER node only

```bash
# Init the cluster (replace with your master's private IP)
kubeadm init \
  --pod-network-cidr=192.168.0.0/16 \
  --apiserver-advertise-address=<MASTER_PRIVATE_IP>

# Set up kubeconfig for your user
mkdir -p $HOME/.kube
cp /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

# Install Calico CNI (pod networking)
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml

# Verify master is Ready
kubectl get nodes
```

### On each WORKER node

```bash
# Use the join command printed by kubeadm init above, e.g.:
kubeadm join <MASTER_IP>:6443 \
  --token <token> \
  --discovery-token-ca-cert-hash sha256:<hash>

# If you lost it, regenerate on master:
kubeadm token create --print-join-command
```

---

## Phase 2 — Cluster infrastructure (one-time)

Run all of these from your master node.

### nginx ingress controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/baremetal/deploy.yaml

# Verify
kubectl get pods -n ingress-nginx
```

### cert-manager (automatic TLS)

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml

# Wait for it to be ready
kubectl wait --for=condition=ready pod -l app=cert-manager -n cert-manager --timeout=60s

# Create ClusterIssuer (replace email)
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: kartikaggarwal2004@gmail.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
EOF
```

### metrics-server (required for HPA)

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

---

## Phase 3 — Deploy Jenkins into the cluster

```bash
# Apply all Jenkins manifests
kubectl apply -f k8s/jenkins/namespace.yaml
kubectl apply -f k8s/jenkins/rbac.yaml
kubectl apply -f k8s/jenkins/pvc.yaml
kubectl apply -f k8s/jenkins/deployment.yaml
kubectl apply -f k8s/jenkins/service.yaml
kubectl apply -f k8s/jenkins/ingress.yaml

# Wait for Jenkins to start (takes ~60s first boot)
kubectl rollout status deployment/jenkins -n jenkins

# Get the initial admin password
kubectl exec -n jenkins deploy/jenkins -- \
  cat /var/jenkins_home/secrets/initialAdminPassword
```

Jenkins is now at: **https://jenkins.geekclash.in/jenkins**

### Configure Jenkins (UI steps)

1. Install suggested plugins + add these manually:
   - **Kubernetes** (for dynamic agent pods)
   - **Docker Pipeline**
   - **Multibranch Pipeline**
   - **Credentials Binding**
   - **Git**

2. **Manage Jenkins → Clouds → New Cloud → Kubernetes**
   - Kubernetes URL: `https://kubernetes.default.svc`
   - Namespace: `jenkins`
   - Jenkins URL: `http://jenkins.jenkins.svc.cluster.local:8080/jenkins`
   - Jenkins tunnel: `jenkins.jenkins.svc.cluster.local:50000`
   - Test connection → Save

3. **Add credentials** (Manage Jenkins → Credentials → Global):

   | ID | Type | Value |
   |---|---|---|
   | `dockerhub-creds` | Username/Password | Your DockerHub login |
   | `kubeconfig` | Secret File | Your `~/.kube/config` file |
   | `vite-api-url` | Secret Text | `https://api.geekclash.in` |
   | `geekclash-secrets` | Secret File | The rendered `k8s/secrets.yaml` with real values |

4. **Create Multibranch Pipeline**
   - New Item → Multibranch Pipeline → name: `geekclash`
   - Branch Sources → GitHub → add your repo URL
   - Scan repository → Jenkins discovers branches with a `Jenkinsfile`

### GitHub webhook (auto-trigger on push)

In your GitHub repo → Settings → Webhooks → Add webhook:
- Payload URL: `https://jenkins.geekclash.in/jenkins/github-webhook/`
- Content type: `application/json`
- Events: Just the push event

---

## Phase 4 — Deploy the application

### First deploy (before Jenkins is running)

```bash
# Namespace + config
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml

# Secrets — create from scratch with real values
kubectl create secret generic geekclash-backend-secrets \
  --from-literal=DB_URL="mongodb+srv://..." \
  --from-literal=SECRET="change_me" \
  --from-literal=USER_SECRET="change_me" \
  --from-literal=ADMIN_SECRET="change_me" \
  --from-literal=EMAIL="you@email.com" \
  --from-literal=PASSWORD="smtp_password" \
  --from-literal=CLOUDINARY_CLOUD_NAME="..." \
  --from-literal=CLOUDINARY_API_KEY="..." \
  --from-literal=CLOUDINARY_API_SECRET="..." \
  --from-literal=RAZORPAY_KEY_ID="rzp_..." \
  --from-literal=RAZORPAY_KEY_SECRET="..." \
  --from-literal=GOOGLE_CLIENT_ID="..." \
  --from-literal=GOOGLE_CLIENT_SECRET="..." \
  -n geekclash --dry-run=client -o yaml | kubectl apply -f -

# Build and push images manually first time
TAG=$(git rev-parse --short HEAD)
DOCKER_USER=yourdockerhubusername

docker build -t $DOCKER_USER/geekclash-backend:$TAG ./backend
docker build --build-arg VITE_API_URL=https://api.geekclash.in -t $DOCKER_USER/geekclash-client:$TAG ./client
docker build --build-arg VITE_API_URL=https://api.geekclash.in -t $DOCKER_USER/geekclash-admin:$TAG ./admin
docker push $DOCKER_USER/geekclash-backend:$TAG
docker push $DOCKER_USER/geekclash-client:$TAG
docker push $DOCKER_USER/geekclash-admin:$TAG

# Apply deployments
for f in k8s/backend-deployment.yaml k8s/client-deployment.yaml k8s/admin-deployment.yaml; do
  sed "s|DOCKERHUB_USERNAME|$DOCKER_USER|g; s|IMAGE_TAG|$TAG|g" "$f" | kubectl apply -f -
done

kubectl apply -f k8s/ingress.yaml
```

After this, every `git push` to `main` or `develop` triggers Jenkins automatically.

---

## Phase 5 — Monitoring (Prometheus + Grafana)

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace \
  -f k8s/monitoring/prometheus-values.yaml
```

Grafana is at: **https://grafana.geekclash.in**  
Default login: `admin` / `changeme123` (change in `prometheus-values.yaml`)

Useful pre-built dashboards to import (Dashboard ID from grafana.com):
- `315` — Kubernetes cluster overview
- `6417` — Pod resource usage
- `1860` — Node exporter full

---

## DNS Setup

Point these DNS A records to your master node's public IP:

```
geekclash.in        → <MASTER_PUBLIC_IP>
api.geekclash.in    → <MASTER_PUBLIC_IP>
admin.geekclash.in  → <MASTER_PUBLIC_IP>
jenkins.geekclash.in → <MASTER_PUBLIC_IP>
grafana.geekclash.in → <MASTER_PUBLIC_IP>
```

If you have worker nodes with separate IPs, point to the worker IP that runs the ingress controller pod instead.

---

## Full end-to-end flow (after setup)

```
Developer: git push origin main
                │
                ▼
        GitHub webhook fires
                │
                ▼
        Jenkins picks up the job
                │
        ┌───────┴────────┐
        │ builds 3 images │  (parallel — backend, client, admin)
        └───────┬────────┘
                │ pushes to DockerHub with SHA tag
                ▼
        kubectl apply manifests
        (sed stamps the exact SHA tag in)
                │
                ▼
        K8s rolling update
        (0 downtime — maxUnavailable: 0)
                │
                ▼
        kubectl rollout status confirms
                │
                ▼
        Prometheus scrapes new pods
        Grafana shows metrics
```

---

## Useful commands

```bash
# Watch all pods across namespaces
kubectl get pods -A

# Jenkins logs
kubectl logs -f deploy/jenkins -n jenkins

# Tail app logs
kubectl logs -f -l app=geekclash-backend -n geekclash

# Check HPA
kubectl get hpa -n geekclash

# Manually trigger a rollout (without a push)
kubectl rollout restart deployment/geekclash-backend -n geekclash

# Check ingress + TLS
kubectl get ingress -A
kubectl describe certificate -n geekclash

# Get node resource usage
kubectl top nodes
kubectl top pods -n geekclash
```

---

## File structure reference

```
QuizCraft/
├── backend/                  Node.js API
│   └── Dockerfile
├── client/                   User frontend (geekclash.in)
│   ├── Dockerfile
│   └── nginx.conf
├── admin/                    Admin panel (admin.geekclash.in)
│   ├── Dockerfile
│   └── nginx.conf
├── Jenkinsfile               Pipeline definition
├── docker-compose.yml        Local dev (all 4 services)
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── backend-deployment.yaml
│   ├── client-deployment.yaml
│   ├── admin-deployment.yaml
│   ├── ingress.yaml
│   ├── jenkins/
│   │   ├── namespace.yaml
│   │   ├── rbac.yaml
│   │   ├── pvc.yaml
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   └── monitoring/
│       └── prometheus-values.yaml
└── DEVOPS.md                 This file
```
