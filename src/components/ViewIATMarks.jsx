import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewIATMarks.css';

const ViewIATMarks = () => {
  const { name } = useParams();
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/marks/${name}`)
      .then((res) => {
        const semesters = res.data.semesters || [];

        const flatMarks = semesters.flatMap((sem) => {
          return Object.entries(sem.marks).map(([subjectName, values]) => ({
            subjectName,
            semester: sem.semester,
            ut1: values.UT1, a1: values.A1, ia1: values.IA1,
            ut2: values.UT2, a2: values.A2, ia2: values.IA2,
            ut3: values.UT3, a3: values.A3, ia3: values.IA3,
          }));
        });

        setMarks(flatMarks);
      })
      .catch((err) => console.error('❌ Error fetching marks:', err));
  }, [name]);

  // Group by semester number
  const grouped = marks.reduce((acc, mark) => {
    const sem = mark.semester || 1;
    if (!acc[sem]) acc[sem] = [];
    acc[sem].push(mark);
    return acc;
  }, {});

  // Format student name nicely
  const formattedName = name.replace(/_/g, ' ').replace(/\.xlsx/gi, '');

  return (
    <div className="iat-view-container">
      <h2>IAT Marks - {formattedName}</h2>

      {Object.entries(grouped)
        .sort((a, b) => Number(a[0]) - Number(b[0])) // Sort semesters in order
        .map(([sem, subjects]) => (
          <div key={sem} className="semester-section">
            <h3>Semester {sem}</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>UT1</th><th>A1</th><th>IA1</th>
                  <th>UT2</th><th>A2</th><th>IA2</th>
                  <th>UT3</th><th>A3</th><th>IA3</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{sub.subjectName}</td>
                    <td>{sub.ut1}</td><td>{sub.a1}</td><td>{sub.ia1}</td>
                    <td>{sub.ut2}</td><td>{sub.a2}</td><td>{sub.ia2}</td>
                    <td>{sub.ut3}</td><td>{sub.a3}</td><td>{sub.ia3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default ViewIATMarks;
