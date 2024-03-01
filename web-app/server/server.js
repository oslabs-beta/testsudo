const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
require('dotenv').config();
// const passport = require('passport');
// const session = require('express-session');
// const bcrypt = require('bcryptjs');
const userController = require('./controllers/userController');


// const GitHubStrategy = require('passport-github').Strategy;


const cookieParser = require('cookie-parser');
const metricsRouter = require('./routes/metricsRouter')
const authController = require('./controllers/authController');
const cookieController = require('./controllers/cookieController');

app.use(express.json());
app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());




// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const redirect_uri = process.env.REDIRECT_URI;

// passport.use(new GitHubStrategy({
//     clientID: client_id,
//     clientSecret: client_secret,
//     callbackURL: redirect_uri
// },
//     async function (accessToken, refreshToken, profile, done) {
//         try {
//             const user = await User.findOne({ githubId: profile.id });
//             if (user) {
//                 if (!user.email) {
//                     user.email = profile.emails[0].value;
//                     await user.save();
//                 }
//                 return done(null, user);
//             } else {
//                 user = await User.create({ githubId: profile.id, email: profile.emails[0].value });
//             };
//             return done(null, user);
//         } catch (error) {
//             return done(error);
//         }
//     }
// ));
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web-app/index.html'));
});

app.get('/action/getUser', userController.getUser, (req, res) => {
    res.json(res.locals.user);
})

app.post('/action/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
    res.json(res.locals.authenticate);
});

app.post('/action/signup', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
    res.json(res.locals.user);
});

app.post('/action/addProject', userController.addProject, (req, res) => {
    res.json(res.locals.projectID);
})

// app.get('/auth/github',
//     passport.authenticate('github')
// );

// app.get('/auth/github/callback',
//     passport.authenticate('github', { failureRedirect: 'http://localhost:8080/signup' }),
//     async (req, res) => {
//         // const fetch = (await import('node-fetch')).default;

//     const code = req.query.code;
//     if (!code) {
//         return res.json('Error: log in not successful, no code provided')
//     }
//     const client_id = process.env.CLIENT_ID;
//     const client_secret = process.env.CLIENT_SECRET;
//     const redirect_uri = process.env.REDIRECT_URI;

//     try {
//         const response = await fetch('https://github.com/login/oauth/access_token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 client_id,
//                 client_secret,
//                 code,
//                 redirect_uri
//             }),
//         });
//         const data = await response.json();
//         if (data.access_token) {
//             res.redirect('http://localhost:8080/home');
//         } else {
//             res.json('Authentication failed');
//         }
//     } catch (error) {
//         res.json('Error occured: ', error)
//     }
// })

app.use('/api/v2', metricsRouter)

        // const code = req.query.code;
        // if (!code) {
        //     return res.json('Error: log in not successful, no code provided')
        // }

        // try {
        //     const response = await fetch('https://github.com/login/oauth/access_token', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             client_id,
        //             client_secret,
        //             code,
        //             redirect_uri
        //         }),
        //     });
        //     const data = await response.json();
        //     if (data.access_token) {
        // res.redirect('http://localhost:8080/home');
        //     } else {
        //         res.json('Authentication failed');
        //     }
        // } catch (error) {
        //     res.json('Error occured: ', error)
        // }
    // });


app.use('*', (req, res) => {
    res.status(404).send('Page not found.');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
