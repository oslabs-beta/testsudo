import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../assets/web_dark_sq_SI@1x.png';

const Login = () => {
  const navigate = useNavigate();

  const [correctCredential, setCorrectCredential] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const generateRandomString = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const loginWithGithub = () => {
    const clientId = '3ec978f6189f3f53cf18';
    const redirectUri = 'http://localhost:8081/home';
    const scope = 'read:user'; // Adjust the scope according to your needs
    const state = generateRandomString(16); // Generate a random string for CSRF protection

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location.href = githubAuthUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: userData.email,
      password: userData.password,
    };
    fetch('/action/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((bool) => {
        setCorrectCredential(bool);
        if (bool) {
          navigate('/home');
        }
      })
      .catch((err) => console.log('App: log in error ', err));
  };

  return (
    <div className="page-container">
      <div className="login-center">
        <h2>testudo</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleDataChange}
          />

          <p>Password</p>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleDataChange}
          />

          <div>
            <button
              type="submit"
              className="btn login-btn"
              // disabled={!userData.email || !userData.password}
            >
              Sign in
            </button>
          </div>
        </form>
        {!correctCredential && <div>Incorrect username or password.</div>}
        <div className="github-login-btn">
          <a href="https://github.com/login/oauth/authorize?client_id=Iv1.37c37bf5027578f5">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="github logo"
              className="github-logo"
            />
            Log in with Github
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => {
              window.location.href = '/auth/google';
            }}
          >
            <img src={google} alt="google logo" className="google-logo" />
          </a>
        </div>
        <p className="signup-footer">
          Not a user yet? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
