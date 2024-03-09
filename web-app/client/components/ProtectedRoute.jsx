import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [loggedIn, setLoggedIn ] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/action/auth')
        .then(res => res.json())
        .then(bool => {
            setLoggedIn(bool);
            if (!bool) {
                navigate('/');
            }
        })
        .catch(err => {
            console.log('Auth check failed: ', err);
            navigate('/');
        });
    }, [navigate]);

    return loggedIn ? children : null;
};

export default ProtectedRoute;
