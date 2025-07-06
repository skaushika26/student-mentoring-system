import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './IATMarksGenerator.css';
import { useNavigate } from 'react-router-dom';

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

const IATMarksGenerator = () => {
  const [students, setStudents] = useState([
    {
      name: '',
      year: '',
      semesters: [{ semester: 1, marks: {} }]
    }
  ]);

  const navigate = useNavigate();

  const handleStudentChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleMarkChange = (studentIndex, semesterIndex, subject, type, value) => {
    const updated = [...students];
    if (!updated[studentIndex].semesters[semesterIndex].marks[subject]) {
      updated[studentIndex].semesters[semesterIndex].marks[subject] = {};
    }
    updated[studentIndex].semesters[semesterIndex].marks[subject][type] = value;
    setStudents(updated);
  };

  const handleSemesterChange = (studentIndex, semesterIndex, value) => {
    const updated = [...students];
    updated[studentIndex].semesters[semesterIndex].semester = Number(value);
    setStudents(updated);
  };

  const addStudent = () => {
    setStudents([...students, { name: '', year: '', semesters: [{ semester: 1, marks: {} }] }]);
  };

  const addSemester = (studentIndex) => {
    const updated = [...students];
    updated[studentIndex].semesters.push({ semester: 1, marks: {} });
    setStudents(updated);
  };

  const downloadPDF = (student, semData, isAll = false) => {
    const doc = new jsPDF();
    const subjects = semesterSubjects[semData.semester];
    const headers = ['Subject', 'UT-1', 'A-1', 'IA-1', 'UT-2', 'A-2', 'IA-2', 'UT-3', 'A-3', 'IA-3'];
    const rows = subjects.map(subject => {
      const m = semData.marks[subject] || {};
      return [
        subject,
        m.ut1 || '', m.a1 || '', m.ia1 || '',
        m.ut2 || '', m.a2 || '', m.ia2 || '',
        m.ut3 || '', m.a3 || '', m.ia3 || ''
      ];
    });

    doc.setFontSize(16);
    doc.text('VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Student: ${student.name}`, 20, 30);
    doc.text(`Year: ${student.year}`, 150, 30);
    doc.text(`Semester: ${semData.semester}`, 20, 40);

    autoTable(doc, {
      startY: 45,
      head: [headers],
      body: rows,
      styles: { halign: 'center', fontSize: 9 },
      headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: 'bold' },
    });

    doc.save(`${student.name}_Sem${semData.semester}_IAT.pdf`);
  };

  const downloadAllSemesters = (student) => {
    const doc = new jsPDF();
    student.semesters.forEach((semData, i) => {
      const subjects = semesterSubjects[semData.semester];
      const headers = ['Subject', 'UT-1', 'A-1', 'IA-1', 'UT-2', 'A-2', 'IA-2', 'UT-3', 'A-3', 'IA-3'];
      const rows = subjects.map(subject => {
        const m = semData.marks[subject] || {};
        return [
          subject,
          m.ut1 || '', m.a1 || '', m.ia1 || '',
          m.ut2 || '', m.a2 || '', m.ia2 || '',
          m.ut3 || '', m.a3 || '', m.ia3 || ''
        ];
      });

      doc.setFontSize(16);
      doc.text('VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY', 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Student: ${student.name}`, 20, 30);
      doc.text(`Year: ${student.year}`, 150, 30);
      doc.text(`Semester: ${semData.semester}`, 20, 40);

      autoTable(doc, {
        startY: 45,
        head: [headers],
        body: rows,
        styles: { halign: 'center', fontSize: 9 },
        headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: 'bold' },
      });

      if (i !== student.semesters.length - 1) doc.addPage();
    });

    doc.save(`${student.name}_All_Semesters_IAT.pdf`);
  };

  const generateAllStudentsPDF = () => {
    const doc = new jsPDF();
    students.forEach((student, i) => {
      student.semesters.forEach((semData, j) => {
        const subjects = semesterSubjects[semData.semester];
        const headers = ['Subject', 'UT-1', 'A-1', 'IA-1', 'UT-2', 'A-2', 'IA-2', 'UT-3', 'A-3', 'IA-3'];
        const rows = subjects.map(subject => {
          const m = semData.marks[subject] || {};
          return [
            subject,
            m.ut1 || '', m.a1 || '', m.ia1 || '',
            m.ut2 || '', m.a2 || '', m.ia2 || '',
            m.ut3 || '', m.a3 || '', m.ia3 || ''
          ];
        });

        doc.setFontSize(16);
        doc.text('VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY', 105, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Student: ${student.name}`, 20, 30);
        doc.text(`Year: ${student.year}`, 150, 30);
        doc.text(`Semester: ${semData.semester}`, 20, 40);

        autoTable(doc, {
          startY: 45,
          head: [headers],
          body: rows,
          styles: { halign: 'center', fontSize: 9 },
          headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: 'bold' },
        });

        if (i !== students.length - 1 || j !== student.semesters.length - 1) doc.addPage();
      });
    });

    doc.save('IAT_Report_All.pdf');
  };

  const saveMarksToDB = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(students)
    });

    if (res.ok) {
      alert('Marks saved successfully!');
    } else {
      const errorData = await res.json();
      alert('Failed to save marks: ' + (errorData.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Error saving marks:', err);
    alert('Failed to save marks.');
  }
};


  return (
    <div className="iat-wrapper">
      <h2>IAT Marks Generator</h2>
      {students.map((student, studentIndex) => (
        <div key={studentIndex} className="student-block">
          <input
            placeholder="Student Name"
            value={student.name}
            onChange={(e) => handleStudentChange(studentIndex, 'name', e.target.value)}
          />
          <input
            placeholder="Year"
            value={student.year}
            onChange={(e) => handleStudentChange(studentIndex, 'year', e.target.value)}
          />

          {student.semesters.map((sem, semesterIndex) => (
            <div key={semesterIndex} className="semester-block">
              <label>Semester:</label>
              <select
                value={sem.semester}
                onChange={(e) => handleSemesterChange(studentIndex, semesterIndex, e.target.value)}
              >
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>

              {semesterSubjects[sem.semester].map((subject, subIndex) => (
                <div key={subIndex}>
                  <h4>{subject}</h4>
                  <div className="subject-marks">
                    {['ut1', 'a1', 'ia1', 'ut2', 'a2', 'ia2', 'ut3', 'a3', 'ia3'].map((type) => (
                      <input
                        key={type}
                        type="number"
                        placeholder={type.toUpperCase()}
                        value={sem.marks[subject]?.[type] || ''}
                        onChange={(e) =>
                          handleMarkChange(studentIndex, semesterIndex, subject, type, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={() => downloadPDF(student, sem)}>📄 Download Semester PDF</button>
              <button onClick={saveMarksToDB}>💾 Save to Database</button>
            </div>
          ))}
          <button onClick={() => addSemester(studentIndex)}>➕ Add Semester</button>
          <button onClick={() => downloadAllSemesters(student)}>📘 Download All Semesters</button>
        </div>
      ))}

      <button onClick={addStudent}>➕ Add Student</button>
      <button onClick={generateAllStudentsPDF}>📥 Download All Students PDF</button>
      <button onClick={() => navigate('/new-counselling')}>➕ Add Counselling Session</button>
    </div>
  );
};

export default IATMarksGenerator;
