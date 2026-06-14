const client = require('prom-client');

// Collect default Node.js metrics (heap, GC, event loop)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'geekclash_' });

// HTTP request duration histogram
const httpRequestDuration = new client.Histogram({
  name: 'geekclash_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

// HTTP request counter
const httpRequestTotal = new client.Counter({
  name: 'geekclash_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

module.exports = { client, httpRequestDuration, httpRequestTotal };