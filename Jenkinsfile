// ═══════════════════════════════════════════════════════════════
// GeekClash — Jenkins Multibranch Pipeline
//
// Flow:
//   1. Checkout code
//   2. Build Docker images (backend + client + admin) in parallel
//   3. Push to DockerHub
//   4. Deploy to Kubernetes via kubectl
//   5. Verify rollouts
//   6. Notify on failure
//
// Requires Jenkins credentials:
//   - dockerhub-creds   (Username/Password)
//   - kubeconfig        (Secret File)
//   - geekclash-secrets (Secret File — env vars for K8s secret)
// ═══════════════════════════════════════════════════════════════

pipeline {
    agent {
        // Each build runs in a fresh pod — no state leakage between builds
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins-agent: geekclash
spec:
  serviceAccountName: jenkins
  containers:
    # Main build container
    - name: build
      image: node:20-alpine
      command: ["cat"]
      tty: true
      resources:
        requests:
          cpu: "200m"
          memory: "256Mi"
        limits:
          cpu: "1"
          memory: "1Gi"

    # Docker-in-Docker for building images
    - name: dind
      image: docker:24-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
      volumeMounts:
        - name: docker-graph-storage
          mountPath: /var/lib/docker

    # kubectl for K8s deployments
    - name: kubectl
      image: bitnami/kubectl:latest
      command: ["cat"]
      tty: true

  volumes:
    - name: docker-graph-storage
      emptyDir: {}
'''
        }
    }

    environment {
        DOCKERHUB_USER = credentials('dockerhub-creds').username
        IMAGE_TAG      = "${GIT_COMMIT[0..6]}"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/geekclash-backend"
        CLIENT_IMAGE   = "${DOCKERHUB_USER}/geekclash-client"
        ADMIN_IMAGE    = "${DOCKERHUB_USER}/geekclash-admin"
        K8S_NAMESPACE  = "geekclash"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        // ─────────────────────────────────────────
        stage('Checkout') {
        // ─────────────────────────────────────────
            steps {
                checkout scm
                script {
                    env.IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Building tag: ${env.IMAGE_TAG}"
                }
            }
        }

        // ─────────────────────────────────────────
        stage('Lint & Install') {
        // ─────────────────────────────────────────
            steps {
                container('build') {
                    sh '''
                        cd backend
                        npm ci --prefer-offline
                    '''
                }
            }
        }

        // ─────────────────────────────────────────
        stage('Docker Login') {
        // ─────────────────────────────────────────
            steps {
                container('dind') {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    }
                }
            }
        }

        // ─────────────────────────────────────────
        stage('Build & Push Images') {
        // ─────────────────────────────────────────
            parallel {
                stage('Backend') {
                    steps {
                        container('dind') {
                            sh """
                                docker build \
                                  -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                                  -t ${BACKEND_IMAGE}:latest \
                                  ./backend
                                docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                                docker push ${BACKEND_IMAGE}:latest
                            """
                        }
                    }
                }
                stage('Client') {
                    steps {
                        container('dind') {
                            withCredentials([string(credentialsId: 'vite-api-url', variable: 'VITE_API_URL')]) {
                                sh """
                                    docker build \
                                      --build-arg VITE_API_URL=${VITE_API_URL} \
                                      -t ${CLIENT_IMAGE}:${IMAGE_TAG} \
                                      -t ${CLIENT_IMAGE}:latest \
                                      ./client
                                    docker push ${CLIENT_IMAGE}:${IMAGE_TAG}
                                    docker push ${CLIENT_IMAGE}:latest
                                """
                            }
                        }
                    }
                }
                stage('Admin') {
                    steps {
                        container('dind') {
                            withCredentials([string(credentialsId: 'vite-api-url', variable: 'VITE_API_URL')]) {
                                sh """
                                    docker build \
                                      --build-arg VITE_API_URL=${VITE_API_URL} \
                                      -t ${ADMIN_IMAGE}:${IMAGE_TAG} \
                                      -t ${ADMIN_IMAGE}:latest \
                                      ./admin
                                    docker push ${ADMIN_IMAGE}:${IMAGE_TAG}
                                    docker push ${ADMIN_IMAGE}:latest
                                """
                            }
                        }
                    }
                }
            }
        }

        // ─────────────────────────────────────────
        stage('Deploy to Kubernetes') {
        // ─────────────────────────────────────────
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                container('kubectl') {
                    withCredentials([
                        file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG'),
                        file(credentialsId: 'geekclash-secrets', variable: 'SECRETS_FILE')
                    ]) {
                        sh """
                            export KUBECONFIG=${KUBECONFIG}

                            # Namespace + config
                            kubectl apply -f k8s/namespace.yaml
                            kubectl apply -f k8s/configmap.yaml

                            # Secrets from file
                            kubectl apply -f ${SECRETS_FILE}

                            # Stamp image tags and apply deployments
                            for f in k8s/backend-deployment.yaml k8s/client-deployment.yaml k8s/admin-deployment.yaml; do
                                sed "s|DOCKERHUB_USERNAME|${DOCKERHUB_USER}|g; s|IMAGE_TAG|${IMAGE_TAG}|g" \$f \
                                  | kubectl apply -f -
                            done

                            kubectl apply -f k8s/ingress.yaml
                        """
                    }
                }
            }
        }

        // ─────────────────────────────────────────
        stage('Verify Rollout') {
        // ─────────────────────────────────────────
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        sh """
                            export KUBECONFIG=${KUBECONFIG}
                            kubectl rollout status deployment/geekclash-backend -n ${K8S_NAMESPACE} --timeout=3m
                            kubectl rollout status deployment/geekclash-client  -n ${K8S_NAMESPACE} --timeout=3m
                            kubectl rollout status deployment/geekclash-admin   -n ${K8S_NAMESPACE} --timeout=3m
                            echo "\\n=== Pod Status ==="
                            kubectl get pods -n ${K8S_NAMESPACE} -o wide
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployed ${IMAGE_TAG} to ${K8S_NAMESPACE} successfully"
        }
        failure {
            echo "❌ Pipeline failed — check logs above"
            // Add Slack/email notification here if needed:
            // slackSend channel: '#deploys', message: "Build FAILED: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        }
        always {
            container('dind') {
                sh 'docker logout || true'
            }
        }
    }
}
