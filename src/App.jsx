import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/LoginPage';
import Attendance from './components/AttendanceComp';
import PayRollPage from './pages/PayRollPage';
import Employees from './pages/Employees';
import TimeOff from './pages/TimeOff';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/payroll' element={<PayRollPage />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/timeoff' element={<TimeOff />} />
      </Routes>
    </Router>
  )
}

export default App;