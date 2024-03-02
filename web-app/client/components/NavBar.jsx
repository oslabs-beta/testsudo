import React, { useState, useEffect } from 'react';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div>
                <a href="/home">Dashboard</a>
            </div>
            <div>
                <a href="/projects">My Projects</a>
            </div>
            <div>
                <a href="/logout">Log out</a>
            </div>
        </div>

    )
}

export default NavBar;
