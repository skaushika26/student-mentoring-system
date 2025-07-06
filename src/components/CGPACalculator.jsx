import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './CGPACalculator.css';

const semesterSubjects = {
  1: ['Mathematics-I', 'Physics', 'Chemistry', 'Problem Solving', 'Engineering Graphics'],
  2: ['Mathematics-II', 'Basic Electrical', 'Environmental Science', 'C Programming', 'Engineering Mechanics'],
  3: ['Data Structures', 'OOPs with Java', 'Digital Logic', 'DBMS', 'Computer Networks'],
  4: ['Design & Analysis of Algorithms', 'Operating Systems', 'Microprocessors', 'Software Engineering', 'Web Technology'],
  5: ['Theory of Computation', 'Computer Architecture', 'Artificial Intelligence', 'Elective-I', 'Open Elective'],
  6: ['Compiler Design', 'Mobile App Development', 'Machine Learning', 'Elective-II', 'Professional Ethics'],
  7: ['Cloud Computing', 'Cyber Security', 'Project Management', 'Elective-III', 'Mini Project'],
  8: ['Internship/Project Work', 'Comprehensive Viva', 'Elective-IV', 'Elective-V', 'Innovation Project']
};

const gradeToPoint = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'RA': 0
};

const CGPACalculator = () => {
  const [selectedSem, setSelectedSem] = useState(1);
  const [grades, setGrades] = useState(Array(semesterSubjects[1].length).fill(''));
  const [allGPAs, setAllGPAs] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  const handleGradeChange = (index, value) => {
    const updated = [...grades];
    updated[index] = value.toUpperCase();
    setGrades(updated);
  };

  const calculateSemesterGPA = () => {
    const points = grades.map(grade => gradeToPoint[grade] ?? 0);
    const validPoints = points.filter(p => typeof p === 'number');
    const total = validPoints.reduce((a, b) => a + b, 0);
    const gpa = (validPoints.length > 0) ? (total / validPoints.length).toFixed(2) : 0;

    const semGPA = {
      semester: selectedSem,
      subjects: semesterSubjects[selectedSem],
      grades: grades,
      gpa
    };

    setAllGPAs(prev => [...prev, semGPA]);
    setGrades(Array(semesterSubjects[selectedSem].length).fill(''));

    // Automatically recalculate CGPA on semester GPA addition
    const newGPAList = [...allGPAs, semGPA].map(g => parseFloat(g.gpa));
    const newCGPA = newGPAList.reduce((a, b) => a + b, 0) / newGPAList.length;
    setCgpa(newCGPA.toFixed(2));
  };

  const downloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('CGPA Grade Report', 15, 15);

  let startY = 25;

  allGPAs.forEach((entry, index) => {
    autoTable(doc, {
      head: [['Subject', 'Grade']],
      body: entry.subjects.map((subj, idx) => [subj, entry.grades[idx]]),
      startY: startY,
      theme: 'striped',
      margin: { left: 15 },
    });

    const finalY = doc.lastAutoTable.finalY || startY + 40;
    doc.text(`Semester ${entry.semester} GPA: ${entry.gpa}`, 15, finalY + 8);
    startY = finalY + 20;
  });

  doc.setFontSize(14);
  doc.text(`Final CGPA: ${cgpa}`, 15, startY + 10);

  doc.save('CGPA_Report.pdf');
};

  return (
    <div className="cgpa-container">
      <h2 style={{ color: 'deepskyblue' }}>Grade-Based CGPA Calculator</h2>

      <label>Select Semester:</label>
      <select value={selectedSem} onChange={(e) => setSelectedSem(parseInt(e.target.value))}>
        {Object.keys(semesterSubjects).map(sem => (
          <option key={sem} value={sem}>Semester {sem}</option>
        ))}
      </select>

      <div className="grades-input">
        {semesterSubjects[selectedSem].map((subj, idx) => (
          <div key={idx} className="grade-row">
            <label>{subj}</label>
            <input
              placeholder="O / A+ / A / B+ / B / RA"
              value={grades[idx]}
              onChange={(e) => handleGradeChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn-calculate" onClick={calculateSemesterGPA}>Add Semester GPA</button>
        <button className="btn-calculate" onClick={downloadPDF} disabled={!cgpa}>Download PDF</button>
      </div>

      {cgpa && (
        <div className="cgpa-result">
          <h3 style={{ color: 'white' }}>Your Final CGPA: {cgpa}</h3>
        </div>
      )}
    </div>
  );
};

export default CGPACalculator;
