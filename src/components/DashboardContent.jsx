// DashboardContent.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function DashboardContent({ employeesTotal }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <main>
      <nav id="sidebar" className={sidebarExpanded ? "expand" : ""}>
        <div className="d-flex align-items-center">
          <button id="toggle-btn" type="button" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <div className="sidebar-logo">
            <a href="#">HR SYSTEM</a>
          </div>
        </div>
        <ul>
          <li><a href="#Dashboard" className="page-links active"><i className="bi bi-house-door"></i><span>Dashboard</span></a></li>
          <li><a href="#Employees" className="page-links"><i className="bi bi-people"></i><span>Employees</span></a></li>
          <li><a href="#Payroll" className="page-links"><i className="bi bi-wallet2"></i><span>Payroll</span></a></li>
          <li><a href="#Attendance" className="page-links"><i className="bi bi-clipboard-check"></i><span>Attendance</span></a></li>
          <li><a href="#TimeOff" className="page-links"><i className="bi bi-clock"></i><span>Time Off</span></a></li>
          <li className="sidebar-footer">
            <Link to="/"><i className="bi bi-box-arrow-right"></i><span>Log Out</span></Link>
          </li>
        </ul>
      </nav>

      <section className="contentWidth">
        <br />
        <h2 className="container contentWidth mb-1 animationTop" style={{ fontWeight: 600 }}>Main Dashboard</h2>
        <div className="container contentWidth text-start mt-4">
          <div className="row align-items-start">
            <div className="col-sm-8 p-3 animationLeft">
              <h4>Overview</h4>
              <div className="row gap-3 mt-3 p-2">
                <div className="col-sm dashboard-content p-3">
                  <i className="fa-solid fa-users mb-3 p-1"></i>
                  <h5 className="fw-semibold">Total Employees</h5>
                  <p>{employeesTotal}</p>
                </div>
                <div className="col-sm dashboard-content p-3">
                  <i className="fa-solid fa-percent mb-3 p-1"></i>
                  <h5 className="fw-semibold">Attendance Percentage</h5>
                  <p>***********</p>
                </div>
                <div className="col-sm dashboard-content p-3">
                  <i className="fa-solid fa-money-bill-transfer mb-3 p-1"></i>
                  <h5 className="fw-semibold">Total Monthly Payroll</h5>
                  <p>***********</p>
                </div>
                <div className="mt-4">
                  <h4>**NEW CONTENT**</h4>
                </div>
                <div className="dashboard-content">
                  Content
                </div>
              </div>
            </div>

            <div className="col-sm-4 p-3 animationRight">
              <h4>Time-off Requests</h4>
              <div className="dashboard-content p-3 mt-4 mb-3" style={{ backgroundImage: 'linear-gradient(#f69610, #fbc100)', backgroundColor: '#f0ad4e', color: '#f0f0f0' }}>
                <h5 id="pending" className="fw-bold">Pending</h5>
                <p>***********</p>
              </div>
              <div className="dashboard-content p-3 mb-3" style={{ backgroundImage: 'linear-gradient(#38a638, #89e789)', backgroundColor: '#5cb85c', color: '#f0f0f0' }}>
                <h5 id="approved" className="fw-bold">Approved</h5>
                <p>***********</p>
              </div>
              <div className="dashboard-content p-3 mb-3" style={{ backgroundImage: 'linear-gradient(#c82c26, #dd7470)', backgroundColor: '#d9534f', color: '#f0f0f0' }}>
                <h5 id="denied" className="fw-bold">Denied</h5>
                <p>***********</p>
              </div>
              <br />
              <h4>Upcoming Birthdays</h4>
              <div className="dashboard-content p-3 mt-4 mb-3">
                <h5>Content</h5>
                <p>***********</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardContent;