import React from 'react';
import { useNavigate } from 'react-router';
const DashNav = ({ setActiveComponent, handleDelete, projectID }) => {
  const navigate = useNavigate();
  return (
    <div className="btn-container">
      <ul className="metric-btns">
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
            style={{ marginLeft: '0%'}}
            onClick={() => {
              navigator.clipboard
              .writeText(projectID)
              .then(() => {alert('Project ID has been copied to clipboard')})
              .catch((err) => console.log('Could not copy text: ', err));
            }}
            className="btn dashboard-btn run-btn"
          >
            Copy Project ID
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
