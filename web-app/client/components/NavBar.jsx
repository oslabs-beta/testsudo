import React, { useState, useEffect } from 'react';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-center">
        <a href="/home" className="projects-link">
          My Projects
        </a>
        <a href="/action/logout" className="logout">
          Log out
        </a>
      </div>
    </div>
  );
};

export default NavBar;
