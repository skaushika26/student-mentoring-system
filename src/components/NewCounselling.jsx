import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './NewCounselling.css';
import { useParams } from 'react-router-dom';

const NewCounselling = () => {
  const { name } = useParams();
  const [sessions, setSessions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    year: '',
    date: '',
    time: '',
    location: '',
    reason: '',
    otherReason: '',
    mentorComment: '',
    actionTaken: '',
    followUp: '',
  });

  useEffect(() => {
    if (name) {
      setFormData(prev => ({ ...prev, studentName: name }));
      fetchSessions();
    }
  }, [name]);

  const fetchSessions = () => {
    axios
      .get('http://localhost:5000/api/counselling/all-sessions')
      .then(res => {
        const filtered = res.data.filter(s => s.studentName === name);
        setSessions(res.data);
        setFilteredSessions(filtered);
      })
      .catch(err => console.error('Error fetching sessions:', err));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const {
      studentName, className, year, date, time,
      location, reason, mentorComment, actionTaken
    } = formData;

    if (!studentName || !className || !year || !date || !time || !location || !reason || !mentorComment || !actionTaken) {
      alert("Please fill in all required fields.");
      return;
    }

    const endpoint = editId
      ? `http://localhost:5000/api/counselling/update-session/${editId}`
      : 'http://localhost:5000/api/counselling/save-session';
    const method = editId ? 'put' : 'post';

    axios[method](endpoint, formData)
      .then(() => {
        alert(`Session ${editId ? 'updated' : 'saved'} successfully!`);
        resetForm();
        fetchSessions();
      })
      .catch(err => {
        console.error('Error saving session:', err);
        alert('Failed to save session.');
      });
  };

  const resetForm = () => {
    setFormData({
      studentName: name,
      className: '',
      year: '',
      date: '',
      time: '',
      location: '',
      reason: '',
      otherReason: '',
      mentorComment: '',
      actionTaken: '',
      followUp: '',
    });
    setEditId(null);
  };

  const handleEdit = session => {
    setFormData(session);
    setEditId(session._id);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      axios
        .delete(`http://localhost:5000/api/counselling/delete-session/${id}`)
        .then(() => {
          fetchSessions();
        })
        .catch(err => console.error('Error deleting session:', err));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Counselling Report for ${name}`, 20, 10);

    autoTable(doc, {
      head: [['#', 'Name', 'Class', 'Year', 'Date', 'Time', 'Venue', 'Reason', 'Mentor Comment', 'Action Taken', 'Follow-Up']],
      body: filteredSessions.map((s, idx) => [
        `Session ${idx + 1}`,
        s.studentName,
        s.className,
        s.year,
        s.date,
        s.time,
        s.location,
        s.reason === 'Others' ? s.otherReason : s.reason,
        s.mentorComment,
        s.actionTaken,
        s.followUp || '-',
      ]),
      startY: 20,
    });

    doc.save(`${name}_counselling_report.pdf`);
  };

  return (
    <div className="new-counselling-container">
      <h1>Mentor Counselling Form</h1>

      <div className="form-vertical">
        <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} readOnly />
        <input type="text" name="className" placeholder="Class (e.g., CSE A)" value={formData.className} onChange={handleChange} />
        <select name="year" value={formData.year} onChange={handleChange}>
          <option value="">-- Year --</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input type="time" name="time" value={formData.time} onChange={handleChange} />
        <input type="text" name="location" placeholder="Venue" value={formData.location} onChange={handleChange} />
        <select name="reason" value={formData.reason} onChange={handleChange}>
          <option value="">-- Reason --</option>
          <option value="Academics">Academics</option>
          <option value="Health Issues">Health Issues</option>
          <option value="Family Issues">Family Issues</option>
          <option value="Financial Problems">Financial Problems</option>
          <option value="Defaulter">Defaulter</option>
          <option value="Latecomer">Latecomer</option>
          <option value="Others">Others</option>
        </select>
        {formData.reason === 'Others' && (
          <input type="text" name="otherReason" placeholder="Specify other reason" value={formData.otherReason} onChange={handleChange} />
        )}
        <textarea name="mentorComment" placeholder="Mentor Comments" value={formData.mentorComment} onChange={handleChange} />
        <textarea name="actionTaken" placeholder="Action Taken" value={formData.actionTaken} onChange={handleChange} />
        <textarea name="followUp" placeholder="Follow-Up Notes (optional)" value={formData.followUp} onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className="save-btn">
        {editId ? 'Update Counselling' : 'Save Counselling'}
      </button>

      <hr />

      <h2>📄 Previous Counselling Records</h2>

      <button onClick={generatePDF} className="pdf-btn">Generate PDF</button>

      {filteredSessions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Year</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Reason</th>
              <th>Mentor Comment</th>
              <th>Action Taken</th>
              <th>Follow-Up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((s, idx) => (
              <tr key={s._id}>
                <td>Session {idx + 1}</td>
                <td>{s.studentName}</td>
                <td>{s.className}</td>
                <td>{s.year}</td>
                <td>{s.date}</td>
                <td>{s.time}</td>
                <td>{s.location}</td>
                <td>{s.reason === 'Others' ? s.otherReason : s.reason}</td>
                <td>{s.mentorComment}</td>
                <td>{s.actionTaken}</td>
                <td>{s.followUp || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                  <button onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No previous sessions found for {name}.</p>
      )}
    </div>
  );
};

export default NewCounselling;
