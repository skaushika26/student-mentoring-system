import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MenteeDashboard.css';

function MenteeDashboard() {
  const { name } = useParams();
  const navigate = useNavigate();

  const studentDetails = {
    "C.Santhiya": "III",
    "S.Kaushika": "III",
    "Kavitha": "III",
    "Diruja": "III",
    "Shivani Suresh": "III",
    "Hemavathi": "III",
    "Shapna": "III",
    "Blessy": "III",
    "Bhava Harini": "III",
    "Balasanthosini": "III",
    "Narmatha": "III",
    "Jeyabharathi": "III"
  };

  const year = studentDetails[name] || "Unknown";

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <button
          className="shining-btn"
          onClick={() => navigate(`/iatmarks/${encodeURIComponent(name)}`, {
            state: {
              name: name,
              year: year,
            }
          })}
        >
          IAT Marks Generator
        </button>

        <button
          className="shining-btn"
          onClick={() => navigate('/cgpa-calculator')}
        >
          CGPA Calculator
        </button>
        <button className="shining-btn" onClick={() => navigate(`/view-iat-marks/${encodeURIComponent(name)}`)}>
          View IAT Marks
        </button>
        <button className="shining-btn" onClick={() => navigate('/upload-marks')}>
          Upload Marks
        </button>
        <button
          className="shining-btn"
          onClick={() => navigate(`/new-counselling/${encodeURIComponent(name)}`)}
        >
          New Counselling
        </button>




      </div>

      <div className="dashboard-main">
        <h2>Mentee Dashboard</h2>
        <p className="welcome-msg">
          Welcome to <strong>{name}</strong> of <strong>{year} year</strong>
        </p>
      </div>
    </div>
  );
}

export default MenteeDashboard;
