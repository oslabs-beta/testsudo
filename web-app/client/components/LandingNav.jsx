import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const LandingNav = () => {

    return (
      <div>
        <nav className="landing-nav">
            <div>
                <Link to="/about" className="menu">ABOUT</Link>
                <Link to="/login" className="menu">LOGIN</Link>
            </div>
        </nav>  
      </div>
    )
}

export default LandingNav;

