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
          {/* <div className="description">
            Our all-in-one toolkit integrates front-end and back-end performance monitoring with robust security testing capabilities, providing developers with actionable insights and tools to optimize their projects effortlessly.
          </div>
          <div className="title1">
          Performance Analysis
          </div>
          <div className="content1">
          Measures front-end and back-end performance metrics, including speed index, load times, response times, errors, and more, giving you a comprehensive overview of your application's health.
          </div>
          <div className="title2">
          Security Testing
          </div>
          <div className="content2">
           Identify and address security vulnerabilities early in the development process with Testudo's built-in security monitoring capabilities.
          </div>  
          <div className="title3">
          Dashboard Visualization
          </div> 
          <div className="content3">
          Manage your projects and access your performance and security metrics conveniently through the dashboard, providing you with insights to optimize your application.
          </div> */}
        </div> 
      </div>
    )
}

export default Landing;