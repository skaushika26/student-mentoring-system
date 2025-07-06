// components/CounsellingStudentList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeList.css'; // Reuse MenteeList styles

const CounsellingStudentList = () => {
  const navigate = useNavigate();
  const mentorId = localStorage.getItem('mentorId');

  const menteeLists = {
    '101': [
      { id: 1, name: "C.Santhiya", department: "CSE", year: "III" },
      { id: 2, name: "S.Kaushika", department: "CSE", year: "III" },
      { id: 3, name: "Kavitha", department: "CSE", year: "III" },
      { id: 4, name: "Diruja", department: "CSE", year: "III" }
    ],
    '102': [
      { id: 1, name: "Shivani Suresh", department: "CSE", year: "III" },
      { id: 2, name: "Hemavathi", department: "CSE", year: "III" },
      { id: 3, name: "Shapna", department: "CSE", year: "III" },
      { id: 4, name: "Blessy", department: "CSE", year: "III" }
    ],
    '103': [
      { id: 1, name: "Bhava Harini", department: "CSE", year: "III" },
      { id: 2, name: "Balasanthosini", department: "CSE", year: "III" },
      { id: 3, name: "Narmatha", department: "CSE", year: "III" },
      { id: 4, name: "Jeyabharathi", department: "CSE", year: "III" }
    ]
  };

  const mentees = menteeLists[mentorId] || [];

  const handleClick = (mentee) => {
    navigate(`/new-counselling/${encodeURIComponent(mentee.name)}`);
  };

  return (
    <div className="mentee-page-wrapper">
      <div className="mentee-page">
        <div className="mentee-background">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>

        <div className="mentee-list-container">
          <h2>Select Student for Counselling</h2>

          <table className="mentee-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mentees.map((mentee, index) => (
                <tr key={mentee.id}>
                  <td>{index + 1}</td>
                  <td>{mentee.name}</td>
                  <td>{mentee.department}</td>
                  <td>{mentee.year}</td>
                  <td>
                    <button onClick={() => handleClick(mentee)}>
                      Start Counselling
                    </button>
                  </td>
                </tr>
              ))}
              {mentees.length === 0 && (
                <tr>
                  <td colSpan="5">No students assigned to this mentor.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounsellingStudentList;
