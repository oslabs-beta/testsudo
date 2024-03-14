import React, { useState, useEffect } from 'react';
import FrontEndMetrics from './FrontEndMetrics.jsx';
import BackEndMetrics from './BackEndMetrics.jsx';
import SecurityMetrics from './SecurityMetrics.jsx';
import NavBar from './NavBar.jsx';

const Dashboard = ({ projectIDState, setProjectIDState }) => {
    console.log('projectIDState is ', projectIDState);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
      };

    const formatData = (data) => {
        return data.map(entry => ({
            ...entry,
            timestamp: formatTimestamp(entry.timestamp)
        }));
    };

    return (
        <div>
            <NavBar />
            
            <FrontEndMetrics projectIDState={projectIDState} formatData={formatData} />
            {/* <BackEndMetrics projectIDState={projectIDState} formatData={formatData} /> */}
            {/* <SecurityMetrics projectIDState={projectIDState} formatData={formatData}  /> */}
        </div>
    )
}

export default Dashboard;
