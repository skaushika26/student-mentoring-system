// ==== FRONTEND (React) - UploadMarks.jsx ====

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const UploadMarks = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !file.name.endsWith('.xlsx')) {
      alert('Please select a valid .xlsx file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const studentNameFromBackend = res.data.name || '';
      setStudentName(studentNameFromBackend);
      setMessage(res.data.message || 'Upload successful');
      console.log('✅ Upload response:', res.data);

      const dataRes = await axios.get(`http://localhost:5000/api/marks/${encodeURIComponent(studentNameFromBackend)}`);
      console.log('📄 Fetched Marks:', dataRes.data);

      if (!dataRes.data.semesters || dataRes.data.semesters.length === 0) {
        alert('No marks data found for this student.');
        return;
      }

      generatePDF(dataRes.data);
    } catch (err) {
      console.error('❌ Upload Error:', err);
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Velammal College of Engineering and Technology', 14, 15);
    doc.setFontSize(12);
    doc.text(`Student Name: ${data.name}`, 14, 25);
    doc.text(`Year: ${data.year}`, 14, 32);

    let y = 40;

    data.semesters.forEach((sem) => {
      doc.text(`Semester ${sem.semester}`, 14, y);
      y += 5;

      const tableData = Object.entries(sem.marks).map(([subject, marks]) => [
        subject,
        marks.UT1 ?? '', marks.A1 ?? '', marks.IA1 ?? '',
        marks.UT2 ?? '', marks.A2 ?? '', marks.IA2 ?? '',
        marks.UT3 ?? '', marks.A3 ?? '', marks.IA3 ?? '',
      ]);

      autoTable(doc, {
        startY: y,
        head: [[
          'Subject', 'UT1', 'A1', 'IA1',
          'UT2', 'A2', 'IA2',
          'UT3', 'A3', 'IA3',
        ]],
        body: tableData,
        styles: { fontSize: 10 },
        theme: 'grid',
      });

      if (doc.previousAutoTable) {
        y = doc.previousAutoTable.finalY + 10;
      }
    });

    doc.save(`${data.name}-IAT-Marks.pdf`);
  };

  return (
    <div className="upload-container" style={{ padding: '20px', color: 'white', backgroundColor: '#0e1b31' }}>
      <h2 style={{ color: '#00d9ff', marginBottom: '20px' }}>Upload Marks Excel</h2>

      <form onSubmit={handleUpload} style={{ marginBottom: '10px' }}>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <button type="submit" className="shining-btn">Upload</button>
      </form>

      {message && (
        <p style={{ color: message.toLowerCase().includes('success') ? 'lightgreen' : 'red' }}>{message}</p>
      )}

      {studentName && (
        <div className="button-group" style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
          <button
            onClick={() => navigate(`/view-iat-marks/${encodeURIComponent(studentName)}`)}
            className="shining-btn"
          >
            View IAT Marks
          </button>
          <button
            onClick={() => navigate('/new-counselling')}
            className="shining-btn"
          >
            New Counselling
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadMarks;
