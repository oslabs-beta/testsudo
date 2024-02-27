import React, { useState, useEffect } from 'react';

const Login = () => {
    return (
        <div>
            Log in page
            <form>
                <div>Username</div>
                <input
                    type="text"
                />

                <div>Password</div>
                <input
                    type="password"
                />

                <div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
            <div>
            <a href="https://github.com/login/oauth/authorize?client_id=Iv1.37c37bf5027578f5">Log in with Github</a> 
            </div>

        </div>
    )
}

export default Login;
