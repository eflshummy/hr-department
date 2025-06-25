import React, { useState, useMemo } from 'react';
import DashboardContent from '../components/DashboardContent';

const EmployeesComp = ({ employeeCount }) => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Shumeez Van Schalkwyk',
      title: 'Software Engineer',
      department: 'Development',
      status: 'Active',
      address: '123 Main Street, Cape Town',
      startDate: '2022-01-15',
      salary: 40000,
      bonus: 3000,
      history: [{ date: '2023-06-01', change: 'Promoted to HR Manager' }],
    },
    {
      id: 2,
      name: 'Kouthar Davids',
      title: 'HR Manager',
      department: 'Human Resources',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Recruiter' }],
    },
    {
      id: 3,
      name: 'Raeesa Samaai',
      title: 'Data Analyst',
      department: 'Data Analytics',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Data Analyst' }],
    },
    {
      id: 4,
      name: 'Aadam Maroof',
      title: 'Sales Representative',
      department: 'Sales',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Sales Representative' }],
    },
    {
      id: 5,
      name: 'Zainul Moses',
      title: 'Marketing Specialist',
      department: 'Marketing',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Marketing Specialist' }],
    },
    {
      id: 6,
      name: 'Ubaidullah Abrahams',
      title: 'UI/UX Designer',
      department: 'Design',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as UI/UX Designer' }],
    },
    {
      id: 7,
      name: 'Abubakr Gamiet',
      title: 'DevOps Engineer',
      department: 'IT',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as DevOps Engineer' }],
    },
    {
      id: 8,
      name: 'Mariam Adamms',
      title: 'Content Strategist',
      department: 'Marketing',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Content Strategist' }],
    },
    {
      id: 9,
      name: 'Ubdullah Aziz',
      title: 'Accountant',
      department: 'Finance',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Accountant' }],
    },
    {
      id: 10,
      name: 'Fatima Patel',
      title: 'Customer Support Lead',
      department: 'Support',
      status: 'Active',
      address: '456 Elm Street, Cape Town',
      startDate: '2021-03-10',
      salary: 35000,
      bonus: 2500,
      history: [{ date: '2023-01-01', change: 'Joined as Customer Support Lead' }],
    },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '', title: '', department: '', status: 'Active',
     address: '', startDate: '', salary: '', bonus: '', history: []
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesName = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
      return matchesName && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  const addEmployee = () => {
    const requiredFields = ['name', 'title', 'department', 'address', 'startDate', 'salary', 'bonus'];
    const hasEmpty = requiredFields.some(field => !newEmployee[field].toString().trim());

    if (hasEmpty) {
      alert('Please fill in all required fields.');
      return;
    }

    const id = Date.now();
    setEmployees(prev => [...prev, { ...newEmployee, id }]);
    setNewEmployee({
      name: '', title: '', department: '', status: 'Active',
      address: '', startDate: '', salary: '', bonus: '', history: []
    });
    setAddModalOpen(false);
  };

  const editEmployee = (emp) => setEditedEmployee({ ...emp });

  const saveEditedEmployee = () => {
    setEmployees(prev => prev.map(emp => emp.id === editedEmployee.id ? editedEmployee : emp));
    setEditedEmployee(null);
  };

  const deactivateEmployee = (emp) => {
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: 'Inactive' } : e));
  };

  const deleteEmployee = (empId) => {
    setEmployees(prev => prev.filter(e => e.id !== empId));
  };

  return (
    <>
    <DashboardContent employeesTotal={employees.length}/>
    <div style={styles.container}>
      <h1 style={styles.title}>Employees</h1>

      <div style={styles.filters}>
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.nameInput} />
        <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} style={styles.select}>
          <option value="All">All Departments</option>
          <option value="Development">Development</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Support">Support</option>
        </select>
        
        <button style={styles.addButton} onClick={() => setAddModalOpen(true)}>Add Employee</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{emp.name}</td>
              <td style={styles.tableCell}>{emp.title}</td>
              <td style={styles.tableCell}>{emp.department}</td>
              <td style={styles.tableCell}>
                <button style={styles.actionButton} onClick={() => setViewingEmployee(emp)}>View</button>
                <button style={styles.actionButton} onClick={() => editEmployee(emp)}>Edit</button>
  
                <button style={{ ...styles.actionButton, backgroundColor: '#c0392b' }} onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {addModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setAddModalOpen(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>Add New Employee</h2>
            <input placeholder="Name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} style={styles.input} />
            <input placeholder="Title" value={newEmployee.title} onChange={e => setNewEmployee({ ...newEmployee, title: e.target.value })} style={styles.input} />
            <input placeholder="Department" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} style={styles.input} />
            <input placeholder="Address" value={newEmployee.address} onChange={e => setNewEmployee({ ...newEmployee, address: e.target.value })} style={styles.input} />
            <input type="date" placeholder="Start Date" value={newEmployee.startDate} onChange={e => setNewEmployee({ ...newEmployee, startDate: e.target.value })} style={styles.input} />
            <input type="number" placeholder="Salary" value={newEmployee.salary} onChange={e => setNewEmployee({ ...newEmployee, salary: e.target.value })} style={styles.input} />
            <input type="number" placeholder="Bonus" value={newEmployee.bonus} onChange={e => setNewEmployee({ ...newEmployee, bonus: e.target.value })} style={styles.input} />
            <button style={styles.saveButton} onClick={addEmployee}>Save</button>
            <button style={styles.cancelButton} onClick={() => setAddModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {editedEmployee && (
        <div style={styles.modalOverlay} onClick={() => setEditedEmployee(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>Edit Employee</h2>
            <input value={editedEmployee.name} onChange={e => setEditedEmployee({ ...editedEmployee, name: e.target.value })} style={styles.input} />
            <input value={editedEmployee.title} onChange={e => setEditedEmployee({ ...editedEmployee, title: e.target.value })} style={styles.input} />
            <input value={editedEmployee.department} onChange={e => setEditedEmployee({ ...editedEmployee, department: e.target.value })} style={styles.input} />
            <button style={styles.saveButton} onClick={saveEditedEmployee}>Save</button>
            <button style={styles.cancelButton} onClick={() => setEditedEmployee(null)}>Cancel</button>
          </div>
        </div>
      )}

      {viewingEmployee && (
        <div style={styles.modalOverlay} onClick={() => setViewingEmployee(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>{viewingEmployee.name}'s Profile</h2>
            <p><strong>Address:</strong> {viewingEmployee.address}</p>
            <p><strong>Start Date:</strong> {viewingEmployee.startDate}</p>
            <p><strong>Salary:</strong> R{viewingEmployee.salary}</p>
            <p><strong>Bonus:</strong> R{viewingEmployee.bonus}</p>
            <h3>History</h3>
            <ul>
              {viewingEmployee.history.map((h, i) => (
                <li key={i}>{h.date}: {h.change}</li>
              ))}
            </ul>
            <button style={styles.cancelButton} onClick={() => setViewingEmployee(null)}>Close</button>
          </div>
        </div>
      )}
    </div></>
  );
};

const styles = {
  container: { maxWidth: 900, margin: '20px auto', fontFamily: 'Segoe UI, sans-serif', padding: '0 20px' , backgroundColor: '#fff',},
  title: { textAlign: 'center', marginBottom: 20 },
  filters: { display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  nameInput: { width: 200, height: 40, padding: '8px 12px', fontSize: 14, borderRadius: 4, border: '1px solid #ccc' },
  select: { width: 200, height: 40, padding: '8px 12px', fontSize: 14, borderRadius: 4, border: '1px solid #ccc', alignItems: 'center', justifyContent: 'center' },
  addButton: { width: 200, height: 40, backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  input: { flex: '1 1 100px', padding: '10px 12px', fontSize: 14, borderRadius: 4, border: '1px solid #ccc', marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 30 },
  tableHeaderRow: { backgroundColor: 'lightblue' },
  tableHeader: { padding: '10px', border: '1px solid #000', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '10px', border: '1px solid #000' },
  actionButton: { marginRight: 6, padding: '6px 10px', fontSize: 13, borderRadius: 4, border: 'none', cursor: 'pointer', backgroundColor: '#3498db', color: '#fff' },
  saveButton: { marginTop: 10, padding: '8px 16px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: 10 },
  cancelButton: { marginTop: 10, padding: '8px 16px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', borderRadius: 8, maxWidth: 400, width: '100%', padding: 20 },
};

export default EmployeesComp;