import express from 'express';
import { collectDefaultMetrics, Registry, Histogram } from 'prom-client';

const metricsApp = express();
const register = new Registry();

collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_microseconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5, 10], // Customize based on expected request durations
  registers: [register],
});

metricsApp.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export { metricsApp, httpRequestDurationMicroseconds };
