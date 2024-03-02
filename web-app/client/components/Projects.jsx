import React, { useState, useEffect } from 'react';

const Projects = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        fetch('/action/getUser')
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log('Error getting user: ', err));
    }, []);

    const projects = user.projects.map((project, i) => {
        <div key={i}>{project.name}</div>
    })

    return (

        <div>
            My projects 

        </div>
    )
}

export default Projects;
