import React from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1>VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
        <p>STUDENTS ATTENDANCE AND PERFORMANCE MANAGEMENT SYSTEM</p>
      </header>
      <nav className="navbar">
        <a href="#">Home</a>
      </nav>
      <main className="main-content">
        <aside className="sidebar">
          <h3>Menus</h3>
          <ul>
            <li>Mentee List</li>
            <li>New Scheduling</li>
            <li>New Counselling</li>
          </ul>
        </aside>
        <section className="content">
          <h2>Welcome "MENTOR of CSE Department"</h2>
          <p className="no-attendance"></p>
        </section>
      </main>
    </div>
  );
}

export default Homepage;