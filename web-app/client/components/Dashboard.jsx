import React, { useState, useEffect } from 'react';
import FrontEndMetrics from './FrontEndMetrics.jsx';
import BackEndMetrics from './BackEndMetrics.jsx';
import SecurityMetrics from './SecurityMetrics.jsx';
import NavBar from './NavBar.jsx';

const Home = () => {
  return (
    <div>
      <NavBar />
      <FrontEndMetrics />
      <BackEndMetrics />
      <SecurityMetrics />
    </div>
  );
};

export default Home;
