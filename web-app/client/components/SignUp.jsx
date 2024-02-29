import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleDataChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: userData.email,
            password: userData.password
        }
        fetch('/action/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)        
        })
        .then(res => res.json())
        .then(bool => {
            if (bool) {
                navigate('/home');
            }
        })
        .catch(err => console.log("App: create user error ", err));
    }

    return (
        <div>
            Sign up page
            <form onSubmit={handleSubmit}>
                <div>Email</div>
                <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleDataChange}
                />

                <div>Password</div>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleDataChange}
                />
                <div>
                    <button
                        type="submit"
                        disabled={!userData.email || !userData.password}
                    >Sign up</button>
                </div>
            </form>
            <div>
                <a href="http://localhost:3000/auth/github">Sign Up with GitHub</a>
            </div>
            <div>Already a user? <a href="/">Log in here</a></div>
        </div>
    )
}

export default SignUp;
