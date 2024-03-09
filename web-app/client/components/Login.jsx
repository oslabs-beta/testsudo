import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="login-center">
      <h2>welcome to testudo</h2>
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
        Not a user yet? <a href="/signup">Sign up here</a>
      </div>
    </div>
  );
};

export default Login;
