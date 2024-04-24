import React, { useState, useEffect } from 'react';
import DashNav from './DashNav.jsx';
// import Summary from './Summary.jsx';
import FrontEndMetrics from './FrontEndMetrics.jsx';
import BackEndMetrics from './BackEndMetrics.jsx';
import SecurityMetrics from './SecurityMetrics.jsx';
import NavBar from './NavBar.jsx';

const Dashboard = ({ projectIDState, setProjectIDState }) => {
  const [activeComponent, setActiveComponent] = useState('frontend');
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
    return data.map((entry) => ({
      ...entry,
      timestamp: formatTimestamp(entry.timestamp),
    }));
  };

  return (
    <div>
      <NavBar />
      <DashNav setActiveComponent={setActiveComponent} />

      {/* {activeComponent === 'summary' && (
        <Summary projectIDState={projectIDState} formatData={formatData} />
      )} */}
      {activeComponent === 'frontend' && (
        <FrontEndMetrics
          projectIDState={projectIDState}
          formatData={formatData}
        />
      )}
      {activeComponent === 'backend' && (
        <BackEndMetrics
          projectIDState={projectIDState}
          formatData={formatData}
        />
      )}
      {activeComponent === 'security' && (
        <SecurityMetrics
          projectIDState={projectIDState}
          formatData={formatData}
        />
      )}
      {/* <BackEndMetrics projectIDState={projectIDState} formatData={formatData} /> */}
      {/* <SecurityMetrics projectIDState={projectIDState} formatData={formatData}  /> */}
    </div>
  );
};

export default Dashboard;
