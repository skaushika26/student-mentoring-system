import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loginpage from './components/Loginpage';
import Homepage from './components/Homepage';
import MenteeList from './components/MenteeList';
import MenteeDashboard from './components/MenteeDashboard';
import IATMarksGenerator from './components/IATMarksGenerator';
import NewCounselling from './components/NewCounselling';
import CGPACalculator from './components/CGPACalculator';
import UploadMarks from './components/UploadMarks';
import ViewIATMarks from './components/ViewIATMarks';
import CounsellingStudentList from './components/CounsellingStudentList'; // ✅ NEW IMPORT

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Authentication */}
        <Route path="/" element={<Loginpage />} />

        {/* 🏠 Mentor Dashboard */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/mentees" element={<MenteeList />} />
        <Route path="/student/:name" element={<MenteeDashboard />} />

        {/* 📊 IAT & Academic */}
        <Route path="/iatmarks/:name" element={<IATMarksGenerator />} />
        <Route path="/view-iat-marks/:name" element={<ViewIATMarks />} />
        <Route path="/cgpa-calculator" element={<CGPACalculator />} />
        <Route path="/upload-marks" element={<UploadMarks />} />

        {/* 🗂 Counselling System */}
        <Route path="/counselling-students" element={<CounsellingStudentList />} /> {/* ✅ Student list page */}
        <Route path="/new-counselling/:name" element={<NewCounselling />} /> {/* ✅ Final form page */}
      </Routes>
    </Router>
  );
}

export default App;
