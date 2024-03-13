import { metricsApp, httpRequestDurationMicroseconds } from './prometheus.js';

export function setupMetrics(app) {
    // `app` is the user's Express app
    // This function would add necessary middleware to the app for metrics collection
    // For simplicity, we are assuming Express; adapt as necessary for other frameworks
    
    app.use((req, res, next) => {
      const start = process.hrtime();
      res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTimeInSeconds = seconds + nanoseconds / 1e9;
        httpRequestDurationMicroseconds.labels(req.method, req.route.path, res.statusCode).observe(responseTimeInSeconds);
      });
      next();
    });
  
    // If you have a predefined metrics route in your metrics module:
    app.use(metricsApp); // Mount the metrics app
  }
