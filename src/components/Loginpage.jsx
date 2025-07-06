import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import studentAnimation from '../assets/student.json'; // make sure the path is correct
import './Loginpage.css';

function Loginpage() {
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (mentorId === '101' && password === 'sun') {
      localStorage.setItem('mentorId', '101');
      navigate('/home');
    } else if (mentorId === '102' && password === 'moon') {
      localStorage.setItem('mentorId', '102');
      navigate('/home');
    } else if (mentorId === '103' && password === 'star') {
      localStorage.setItem('mentorId', '103');
      navigate('/home');
    } else {
      if (!['101', '102', '103'].includes(mentorId)) {
        setError('Please enter valid ID');
      } else {
        setError('Password is wrong');
      }
    }
  };

  return (
    <div className="container">
      <div class="bubbles">
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
</div>



      <h1 className="title">MENTORING SYSTEM - MENTOR LOGIN</h1>
      <h2 className="subtitle">Academic Year 2025-2026</h2>

      <div className="login-layout">
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <div className="form-heading">Mentor Login</div>

            <div className="form-group">
              <label>Mentor ID</label>
              <input
                type="text"
                placeholder="Enter your ID"
                className="input-field"
                value={mentorId}
                onChange={(e) => setMentorId(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        </div>

        <div className="animation-box">
          <Lottie animationData={studentAnimation} loop={true} />
        </div>
      </div>

      <p className="footer-note">For authorized mentors only.</p>
    </div>
  );
}

export default Loginpage;
