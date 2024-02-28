const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
const metricsRouter = require('./routes/metricsRouter')

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web-app/index.html'));
});

app.get('/auth/github/callback', async (req, res) => {
    const fetch = (await import('node-fetch')).default;

    const code = req.query.code;
    if (!code) {
        return res.json('Error: log in not successful, no code provided')
    }
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
                redirect_uri
            }),
        });
        const data = await response.json();
        if (data.access_token) {
            res.redirect('http://localhost:8080/home');
        } else {
            res.json('Authentication failed');
        }
    } catch (error) {
        res.json('Error occured: ', error)
    }
})

app.use('/api/v2', metricsRouter)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
