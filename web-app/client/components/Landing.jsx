import React, { useState, useEffect } from 'react';
import LandingNav from './LandingNav.jsx'

const Landing = () => {

    return (
      <div className="image-container">
      <LandingNav />
      <div className="image-wrapper">
        <img src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className={`overlay-logo`}>
              TESTUDO
            </div>
            <div className={`overlay-text`}>
            Optimize performance. Enhance security. Simplify development.
          </div>
        </div> 
      </div>
    )
}

export default Landing;
