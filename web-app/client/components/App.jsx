import React from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import Projects from './Projects.jsx';

function App () {
    return (
        <div>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/signup" element= {<SignUp />} />
                <Route path="/home" element= {
                    <Projects />
                } />
                <Route path="/dashboard" element= {
                    <Dashboard />
                } />
            </Routes>
        </div>
    )
}

export default App;
