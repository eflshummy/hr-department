import React, { useState, useMemo } from "react";
import AttendanceDataRaw from "../data/attendance.json";

// Optional department map if needed (example)
const departmentMap = {
  1: "HR",
  2: "Engineering",
  3: "Engineering",
  4: "Sales",
  5: "HR",
  6: "Finance",
  7: "Engineering",
  8: "HR",
  9: "Marketing",
  10: "HR"
};

const attendancePpl = AttendanceDataRaw.attendanceAndLeave.map((person) => ({
  id: person.employeeId,
  name: person.name,
  department: departmentMap[person.employeeId] || "General",
  attendance: person.attendance.reduce((acc, curr) => {
    acc[curr.date] = curr.status;
    return acc;
  }, {}),
  leaveRequests: person.leaveRequests,
}));

const getAllDates = (records) => {
  const dateSet = new Set();
  records.forEach(({ attendance }) => {
    Object.keys(attendance).forEach((date) => dateSet.add(date));
  });
  return Array.from(dateSet).sort();
};

const statusColor = (status) => {
  switch (status) {
    case "Present":
      return { color: "#16a34a" };
    case "Absent":
      return { color: "#dc2626" };
    case "Late":
      return { color: "#eab308" };
    case "On Leave":
      return { color: "#3b82f6" };
    default:
      return { color: "#9ca3af" };
  }
};

const AttendanceComp = () => {
  const [attendanceRecords, setAttendanceRecords] = useState(attendancePpl);
  const [searchName, setSearchName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const dateRange = useMemo(() => getAllDates(attendanceRecords), [attendanceRecords]);

  const filteredEmployees = useMemo(() => {
    return attendanceRecords.filter((emp) => {
      const matchesName = emp.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesDept = selectedDepartment === "All" || emp.department === selectedDepartment;
      return matchesName && matchesDept;
    });
  }, [attendanceRecords, searchName, selectedDepartment]);

  const departments = useMemo(() => {
    const deptSet = new Set(attendanceRecords.map((e) => e.department));
    return ["All", ...deptSet];
  }, [attendanceRecords]);

  const getSummaryCounts = (emp) => {
    if (!emp) return {};
    const statuses = Object.values(emp.attendance);
    return {
      present: statuses.filter((s) => s === "Present").length,
      absent: statuses.filter((s) => s === "Absent").length,
      late: statuses.filter((s) => s === "Late").length,
      onLeave: statuses.filter((s) => s === "On Leave").length,
    };
  };

  const totalPresent = useMemo(() => {
    return attendanceRecords.reduce((acc, emp) => {
      const presentCount = Object.values(emp.attendance).filter((s) => s === "Present").length;
      return acc + presentCount;
    }, 0);
  }, [attendanceRecords]);

  const statuses = ["Present", "Absent", "Late", "On Leave"];
  const simulateAttendance = () => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((emp) => {
        const newAttendance = {};
        dateRange.forEach((date) => {
          newAttendance[date] = statuses[Math.floor(Math.random() * statuses.length)];
        });
        return { ...emp, attendance: newAttendance };
      })
    );
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Attendance Page</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: 5, marginRight: 10 }}
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ padding: 5 }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <button
          onClick={simulateAttendance}
          style={{ marginLeft: 20, padding: "5px 10px" }}
          title="Simulate random attendance data"
        >
          Simulate Attendance
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>Total Present Days (All Employees): </strong> {totalPresent}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: 8, textAlign: "left", backgroundColor: "#f3f4f6" }}>Name</th>
            {dateRange.map((date) => (
              <th key={date} style={{ border: "1px solid #ddd", padding: 8, backgroundColor: "#f3f4f6" }}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id} style={{ cursor: "pointer" }} onClick={() => setSelectedEmployee(emp)} title="Click to view details">
              <td style={{ border: "1px solid #ddd", padding: 8, fontWeight: "bold" }}>{emp.name}</td>
              {dateRange.map((date) => (
                <td key={date} style={{ border: "1px solid #ddd", padding: 8, ...statusColor(emp.attendance[date]), textAlign: "center" }}>
                  {emp.attendance[date] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div
          onClick={() => setSelectedEmployee(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              minWidth: 300,
            }}
          >
            <h2>{selectedEmployee.name} - Attendance Details</h2>
            <p>
              <strong>Department:</strong> {selectedEmployee.department}
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: 8, backgroundColor: "#f3f4f6", textAlign: "left" }}>Date</th>
                  <th style={{ border: "1px solid #ddd", padding: 8, backgroundColor: "#f3f4f6", textAlign: "left" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedEmployee.attendance).map(([date, status]) => (
                  <tr key={date}>
                    <td style={{ border: "1px solid #ddd", padding: 8 }}>{date}</td>
                    <td style={{ border: "1px solid #ddd", padding: 8, ...statusColor(status), fontWeight: "bold" }}>{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h3>Summary</h3>
              {(() => {
                const summary = getSummaryCounts(selectedEmployee);
                return (
                  <ul>
                    <li>Days Present: {summary.present}</li>
                    <li>Days Absent: {summary.absent}</li>
                    <li>Times Late: {summary.late}</li>
                    <li>On Leave: {summary.onLeave}</li>
                  </ul>
                );
              })()}
            </div>

            <button onClick={() => setSelectedEmployee(null)} style={{ marginTop: 20, padding: "6px 12px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceComp;