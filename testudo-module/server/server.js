import express from 'express';
import { register } from '../src/core/prometheus.js';
import prometheusController from './controllers/prometheusController.js';

const PORT = 3000;

const app = express();

app.use(prometheusController.requestDuration);

app.get('/prometheus', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
  