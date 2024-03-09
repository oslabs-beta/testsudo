import { Collection } from 'measured-core';

const metricsCollection = new Collection();

// Create a timer metric for request durations
const httpRequestTimer = metricsCollection.timer('http.requests');

const metrics = {
    totalRequests: 0,
    averageResponseTime: 0,
    pathsInfo: {},
    errors: 0,
};

const handleMeasuredRequest = (req, res, next) => {
    const start = process.hrtime();
    metrics.totalRequests += 1;
    
    const originalSend = res.send;
    res.send = function(...args) {
        const diff = process.hrtime(start);
        const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Duration in milliseconds
        metrics.averageResponseTime = ((metrics.averageResponseTime * (metrics.totalRequests - 1)) + duration) / metrics.totalRequests;
        
        const path = req.path;
        if (!metrics.pathsInfo[path]) {
            metrics.pathsInfo[path] = { count: 1, averageTime: duration };
        } else {
            const pathInfo = metrics.pathsInfo[path];
            pathInfo.averageTime = ((pathInfo.averageTime * pathInfo.count) + duration) / (pathInfo.count + 1);
            pathInfo.count += 1;
            metrics.pathsInfo[path] = pathInfo;
        }

        originalSend.apply(res, args);
    };

    res.on('finish', () => {
        // Log at the end of the response
        console.log(`Request to ${req.path} took ${metrics.pathsInfo[req.path].averageTime} ms on average`);
        console.log(metrics);
    });

    res.on('error', () => {
        metrics.errors += 1;
    });

    next();
};

export { handleMeasuredRequest };
