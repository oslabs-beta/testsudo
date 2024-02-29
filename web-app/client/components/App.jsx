import React from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Projects from './Projects.jsx';

function App () {
    return (
        <div>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/signup" element= {<SignUp />} />
                <Route path="/home" element= {
                    <Home />
                } />
                <Route path="/projects" element= {
                    <Projects />
                } />
            </Routes>
        </div>
    )
}

export default App;
