import { httpRequestDurationSeconds } from '../prometheus.js';

const prometheusController = {};

prometheusController.requestDuration = (req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTimeInS = seconds + nanoseconds / 1e9;

        httpRequestDurationSeconds.labels(req.method, req.path, res.statusCode).observe(responseTimeInS);
    });
    next();
}

export default prometheusController;
