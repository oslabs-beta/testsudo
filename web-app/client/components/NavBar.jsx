import React, { useState, useEffect } from 'react';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div>
                <a href="/home">My Projects</a>
            </div>

            <div>
                <a href="/action/logout">Log out</a>
            </div>
        </div>

    )
}

export default NavBar;
