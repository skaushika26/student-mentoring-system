import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

function Loginpage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/homepage'); // navigate to the homepage
  };

  return (
    <div className="container">
      <h1 className="title">MENTORING SYSTEM - MENTOR LOGIN</h1>
      <h2 className="subtitle">Academic Year 2025-2026</h2>

      <div className="login-card">
        <form onSubmit={handleLogin}>
          <div className="form-heading">Mentor Login</div>

          <div className="form-group">
            <label>Mentor ID</label>
            <input
            
              type="text"
              placeholder="Enter your ID"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
      </div>

      <p className="footer-note">For authorized mentors only.</p>
    </div>
  );
}

export default Loginpage;