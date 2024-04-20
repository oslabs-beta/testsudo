import React from 'react';
import { useNavigate } from 'react-router';
const DashNav = ({ setActiveComponent, handleDelete }) => {
  const navigate = useNavigate();
  // const runMetricsHandle = () => {
  //   console.log('button clicked');
  // };
  return (
    <div className="btn-container">
      <ul className="metric-btns">
        <li>
          <button
            className="btn dashboard-btn"
            onClick={() => setActiveComponent('summary')}
          >
            Summary
          </button>
        </li>
        <li>
          <button
            className="btn dashboard-btn"
            onClick={() => setActiveComponent('frontend')}
          >
            Frontend
          </button>
        </li>
        <li>
          <button
            className="btn dashboard-btn"
            onClick={() => setActiveComponent('backend')}
          >
            Backend
          </button>
        </li>
        <li>
          <button
            className="btn dashboard-btn"
            onClick={() => setActiveComponent('security')}
          >
            Security
          </button>
        </li>
        <li>
          <button
            style={{ marginLeft: '0%' }}
            onClick={() => handleDelete()}
            className="btn dashboard-btn run-btn"
          >
            {' '}
            Delete{' '}
          </button>
        </li>
      </ul>
    </div>
  );
};
export default DashNav;
