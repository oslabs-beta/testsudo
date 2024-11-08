import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../wrappers/LandingNav';
import Logo from '../assets/logo.png';

const LandingNav = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <img src={Logo} alt="logo" className="logo" />
        <div className="nav-btn-container">
          <button type="button" className="nav-login btn">
            Login
          </button>
          <button type="button" className="nav-login btn">
            Signup
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingNav;
