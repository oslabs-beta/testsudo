import React from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import Projects from './Projects.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App () {
    return (
        <div>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/signup" element= {<SignUp />} />
                <Route path="/home" element= {
                    <ProtectedRoute >
                        <Projects />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/*" element= {
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    )
}

export default App;
