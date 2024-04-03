const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const { register } = require('./prometheus.js');
// const prometheusController = require('./controllers/prometheusController.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const metricsRouter = require('./routes/metricsRouter.js');
// const authController = require('./controllers/authController.js');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../web-app/index.html'));
});

app.get('/action/getUser', sessionController.isLoggedIn, (req, res) => {
  res.json(res.locals.user);
});

app.post(
  '/action/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.json(res.locals.authenticate);
  }
);

app.post(
  '/action/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.json(res.locals.user);
  }
);

app.get(
  '/action/checkDuplicate/:email',
  userController.checkDuplicate,
  (req, res) => {
    res.json(res.locals.duplicate);
  }
);

app.get('/action/auth', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(true);
});

app.post('/action/addProject', userController.addProject, (req, res) => {
  res.json(res.locals.projectID);
});

app.get('/action/logout', sessionController.endSession, (req, res) => {
  res.clearCookie('ssid');
  res.redirect('/');
});

app.use('/projects', metricsRouter);

// app.use(prometheusController.requestDuration);

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found.');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
