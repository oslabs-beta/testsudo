import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../wrappers/LandingNav';
import Logo from '../assets/logo.png';

const LandingNav = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="typewriter">
          <a href="/" className="logo-link">
            <img src={Logo} alt="logo" className="logo" />
          </a>
          <h1>estsudo</h1>
        </div>
        <div className="nav-btn-container">
          <a href="https://github.com/oslabs-beta/testsudo" target="_blank">
            <FaGithub className="github-logo-landing" />
          </a>
          <a href="/login" className="btn">
            Login
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingNav;
