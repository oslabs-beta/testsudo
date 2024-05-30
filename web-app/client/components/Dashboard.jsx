import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DashNav from './DashNav.jsx';
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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      fetch(`/action/deleteProject/${projectIDState}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          navigate('/home');
        })
        .catch((err) => console.log('App: delete project error ', err));
    } else {
      console.log('Deletion cancelled by user.');
    }
  }

  return (
    <div>
      <NavBar />
      <DashNav setActiveComponent={setActiveComponent} handleDelete={handleDelete} projectID={projectIDState}/>

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
    </div>
  );
};

export default Dashboard;
