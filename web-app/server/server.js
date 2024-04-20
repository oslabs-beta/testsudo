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
const passport = require('passport');
const session = require('express-session');
const { ObjectId } = require('mongodb');
// const bcrypt = require('bcryptjs');
const { User } = require('./models/mongodb.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const objectId = new ObjectId(id);
  User.findById(objectId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

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
// GOOGLE OAUTH
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            tokens: {
              provider: 'Google',
              profileID: profile.id,
              accessToken,
              refreshToken,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res, next) {
    res.locals.userID = req.user.id;
    next();
  },
  cookieController.setSSIDCookie,
  sessionController.startSession,
  function (req, res) {
    // Successful authentication, redirect to home
    res.redirect('http://localhost:8081/home');
  }
);
// GITHUB OAUTH
const GitHubStrategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ username: profile.username });
        if (!user) {
          user = await User.create({
            username: profile.username,
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : undefined,
            tokens: {
              provider: 'Github',
              profileID: profile.id,
              accessToken,
              refreshToken,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['read:user'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function (req, res, next) {
    res.locals.userID = req.user.id;
    next();
  },
  cookieController.setSSIDCookie,
  sessionController.startSession,
  function (req, res) {
    // Successful authentication, redirect to home
    res.redirect('http://localhost:8081/home');
  }
);

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
