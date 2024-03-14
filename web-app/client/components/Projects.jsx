import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; 


const Projects = ({projectIDState, setProjectIDState}) => {
    const [user, setUser] = useState('');
    const [projectID, setProjectID] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [projectAdded, setProjectAdded] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate(); 

    const getUser = () => {
        fetch('/action/getUser')
            .then(res => res.json())
            .then(data => {
                setUser(data)
                console.log(data);
            })
            .catch(err => console.log('Error getting user: ', err));
    }
    useEffect(getUser, []);

    let projects = null;
    // if (user && user.projects) {
    //     projects = user.projects.map((project, i) => (
    //         <div key={i}><a href={`/dashboard/${project._id}`}>{project.name}</a></div> 
    //     ));
    // }

    if (user && user.projects) {
        projects = user.projects.map((project, i) => (
            <div key={i}>
                <a onClick={(e) => {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: projectName })
        })
            .then(res => res.json())
            .then(data => {
                setProjectID(data);
                setProjectAdded(true);
            })
            .catch(err => console.log('Error adding project: ', err))
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(projectID)
            .then(() => setCopied(true))
            .catch((err) => console.log('Could not copy text: ', err))
    }

    return (
        <div>
            <NavBar />
            <div>My projects</div>
            {projects}

            <button onClick={() => {
                setModalIsOpen(true);
                setProjectAdded(false);
                setProjectID('');
            }}>Add project</button>
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
                    },
                }}
            >
                {!projectAdded && (
                    <div>
                        <h2>Add New Project</h2>
                        <form onSubmit={handleAdd}>
                            <div>Project name</div>
                            <input
                                type="text"
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                            />
                            <button type="submit">Add project</button>
                        </form>
                    </div>
                )}
                {projectAdded && (
                    <div>
                        <h2>Project added!</h2>
                        <p>Please save your Project ID to your .env file:<br />
                            {projectID}</p>
                        <div>
                            <button onClick={copyToClipBoard}>Copy Project ID to Clipboard</button>
                        </div>
                        {copied && <div>Copied!</div>}
                        <div>
                            <button onClick={() => {
                                setModalIsOpen(false);
                                getUser();
                            }}>Done</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Projects;
