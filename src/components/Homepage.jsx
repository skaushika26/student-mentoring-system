import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage-wrapper">
      <div className="homepage">
        <div className="background-animation">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>

        <div className="menu-container">
          <ul className="menu-list">
            <li>
              <Link to="/mentees">Mentee List</Link>
            </li>
            <li>
              <Link to="/scheduling">New Scheduling</Link>
            </li>
            <li>
              <Link to="/counselling-students">New Counselling</Link> {/* ✅ FIXED */}
            </li>
          </ul>
          <div className="welcome-message">
            Welcome "MENTOR of CSE Department"
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
