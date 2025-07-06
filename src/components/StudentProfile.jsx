import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./StudentProfile.css";

function StudentProfile() {
  const { name } = useParams();
  const [student, setStudent] = useState(null);
  const reportRef = useRef();

 useEffect(() => {
  console.log("Fetching student data for:", name);
  axios.get(`http://localhost:5000/api/counselling/student/${name}`)

    .then(res => {
      console.log("Response data:", res.data);
      setStudent(res.data);
    })
    .catch(err => {
      console.error("API error:", err);
    });
}, [name]);


  const downloadPDF = () => {
    html2canvas(reportRef.current).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = canvas.height * width / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${student.name}_Report.pdf`);
    });
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="profile-container" ref={reportRef}>
      <h1>{student.name}'s Profile</h1>
      <p className="info"><strong>Reg No:</strong> {student.regNo}</p>
      <p className="info"><strong>Department:</strong> {student.department}</p>
      <p className="info"><strong>Year:</strong> {student.year}</p>
      <p className="info"><strong>Semester:</strong> {student.semester}</p>

      <h2>Marks</h2>
      <table className="marks-table">
        <thead>
          <tr className="semester-row">
            <th colSpan="10">Semester: {student.semester}</th>
          </tr>
          <tr>
            <th>Subject Code</th>
            <th>Subject</th>
            <th>UT-1</th>
            <th>A-1</th>
            <th>IA-1</th>
            <th>UT-2</th>
            <th>A-2</th>
            <th>IA-2</th>
            <th>UT-3</th>
            <th>A-3</th>
            <th>IA-3</th>
          </tr>
        </thead>
        <tbody>
          {student.marks.map((subj, idx) => (
            <tr key={idx}>
              <td>{subj.subjectCode}</td>
              <td>{subj.subjectName}</td>
              <td>{subj.UT1 || "NA"}</td>
              <td>{subj.A1 || "NA"}</td>
              <td>{subj.IA1 || "NA"}</td>
              <td>{subj.UT2 || "NA"}</td>
              <td>{subj.A2 || "NA"}</td>
              <td>{subj.IA2 || "NA"}</td>
              <td>{subj.UT3 || "NA"}</td>
              <td>{subj.A3 || "NA"}</td>
              <td>{subj.IA3 || "NA"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadPDF} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Download Report PDF
      </button>
    </div>
  );
}

export default StudentProfile;
