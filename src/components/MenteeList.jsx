import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenteeList.css';

function MenteeList() {
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

  const [searchText, setSearchText] = useState("");

  const filteredMentees = mentees.filter((mentee) =>
    mentee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleViewProfile = (mentee) => {
    navigate(`/student/${encodeURIComponent(mentee.name)}`, { state: mentee });
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
          <h2>Mentee List</h2>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>

          <div className="table-container">
            <table className="mentee-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name of the Student</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentees.map((mentee) => (
                  <tr key={mentee.id}>
                    <td>{mentee.id}</td>
                    <td>{mentee.name}</td>
                    <td>{mentee.department}</td>
                    <td>{mentee.year}</td>
                    <td>
                      <button className="view-button" onClick={() => handleViewProfile(mentee)}>
                        Click to Know
                      </button>

                    </td>
                  </tr>
                ))}
                {filteredMentees.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "gray" }}>
                      No mentees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeList;
