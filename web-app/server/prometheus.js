// import { Registry, collectDefaultMetrics, Histogram } from 'prom-client';

// // create registry to register metrics
// const register = new Registry();

// // enable collection of default metrics like CPU, runtime, etc.
// collectDefaultMetrics({ register });

// // define custom metrics
// const httpRequestDurationSeconds = new Histogram({
//     name: 'http_request_duration_seconds',
//     help: 'Duration of HTTP requests in seconds',
//     labelNames: ['method', 'route', 'status_code'],
//     buckets: [0.1, 0.5, 1, 1.5, 2, 5, 10] // Define your bucket sizes
// })

// // register custom metrics to registsry
// register.registerMetric(httpRequestDurationSeconds);

// // expose registered metrics 
// export { register, httpRequestDurationSeconds}
