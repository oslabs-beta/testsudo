import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const Projects = ({ projectIDState, setProjectIDState }) => {
  const [user, setUser] = useState('');
  const [projectID, setProjectID] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projectAdded, setProjectAdded] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const getUser = () => {
    fetch('/action/getUser')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log('Error getting user: ', err));
  };
  useEffect(getUser, []);

  let projects = null;
  // if (user && user.projects) {
  //     projects = user.projects.map((project, i) => (
  //         <div key={i}><a href={`/dashboard/${project._id}`}>{project.name}</a></div>
  //     ));
  // }

  if (user && user.projects) {
    projects = user.projects.map((project, i) => (
      <div key={i} className="individual-project">
        <a
          onClick={(e) => {
            e.preventDefault();
            setProjectIDState(project._id);
            localStorage.setItem('projectID', project._id);
            navigate(`/dashboard/${project._id}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {project.name}
        </a>
      </div>
    ));
  }

  const handleAdd = (e) => {
    e.preventDefault();

    fetch('/action/addProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: projectName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjectID(data);
        setProjectAdded(true);
      })
      .catch((err) => console.log('Error adding project: ', err));
  };

  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(projectID)
      .then(() => setCopied(true))
      .catch((err) => console.log('Could not copy text: ', err));
  };

  return (
    <div>
      <NavBar />
      <div className="projects-page">
        <div className="projects-container">
          <p>My Projects</p>
          <div className="underline"></div>
          <div className="projects-container-results">{projects}</div>

          <button
            onClick={() => {
              setModalIsOpen(true);
              setProjectAdded(false);
              setProjectID('');
            }}
            className="btn projects-btn"
          >
            Add project
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '30vw',
                height: '15rem',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
              },
            }}
          >
            {!projectAdded && (
              <div className="modal-container">
                <h2 className="modal-title">Add New Project</h2>
                <form onSubmit={handleAdd}>
                  <div className="project-name">Project Name</div>
                  <input
                    type="text"
                    placeholder="Nestorfy..."
                    className="project-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <button type="submit" className="btn modal-btn">
                    Add project
                  </button>
                </form>
              </div>
            )}
            {projectAdded && (
              <div className="project-added-container">
                <h2 className="modal-title">Project added!</h2>
                <p>
                  Please save your Project ID to your .env file:
                  <br />
                  {projectID}
                </p>
                <div>
                  <button
                    onClick={copyToClipBoard}
                    className="btn project-added-btn"
                  >
                    Copy Project ID to Clipboard
                  </button>
                </div>
                {copied && <div>Copied!</div>}
                <div>
                  <button
                    onClick={() => {
                      setModalIsOpen(false);
                      getUser();
                    }}
                    className="btn project-added-btn"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Projects;
