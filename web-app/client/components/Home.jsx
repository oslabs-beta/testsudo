import React, { useState, useEffect } from 'react';
import FrontEndMetrics from './FrontEndMetrics.jsx';
import BackEndMetrics from './BackEndMetrics.jsx';
import SecurityMetrics from './SecurityMetrics.jsx';

const Home = () => {
    return (
        <div>
            Home page
            <FrontEndMetrics />
            <BackEndMetrics />
            <SecurityMetrics />
        </div>
    )
}

export default Home;
