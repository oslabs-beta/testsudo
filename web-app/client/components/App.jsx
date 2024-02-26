import React from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';

function App () {
    return (
        <div>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/signup" element= {<SignUp />} />
                <Route path="/home" element= {
                    <Home />
                } />
                
            </Routes>
        </div>
    )
}

export default App;
