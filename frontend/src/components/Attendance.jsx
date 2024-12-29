import React, { useEffect, useState } from "react";
import ReusableHeader from "./ReusableHeader";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const fetchAttendance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();

      // Filter out invalid or empty records
      const validAttendance = Array.isArray(data)
        ? data.filter(
            (item) =>
              item.employeeId &&
              item.employeeId.name &&
              item.employeeId.department &&
              item.status
          )
        : [];

      setAttendance(validAttendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const addAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance/add-attendance",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const newAttendance = res.data;

      // Filter out invalid or empty records
      const validAttendance = newAttendance.filter(
        (item) =>
          item.employeeId &&
          item.employeeId.name &&
          item.employeeId.department &&
          item.status
      );

      if (validAttendance.length > 0) {
        setAttendance((prevAttendance) => [...prevAttendance, ...validAttendance]);
      }
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  useEffect(() => {
    addAttendance();
    fetchAttendance();
  }, []);

  const statusOptions = ["present", "work from home", "medical leave", "absent"];

  const filteredAttendance = attendance.filter((item) =>
    (searchTerm
      ? item.employeeId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true) &&
    (filterDepartment ? item.employeeId?.department === filterDepartment : true)
  );

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/attendance/${id}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchAttendance();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "text-green-500";
      case "work from home":
        return "text-blue-500";
      case "medical leave":
        return "text-yellow-500";
      case "absent":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <ReusableHeader />
      </div>

      <div className="flex justify-between mb-6">
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Departments</option>
          <option value="Sales">Sales</option>
          <option value="Administration">Administration</option>
          <option value="Accounting">Accounting</option>
        </select>

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr className="backgroundGradiend">
              <th className="py-4 px-6">Profile</th>
              <th className="py-4 px-6 text-left">Employee Name</th>
              <th className="py-4 px-6 text-left">Department</th>
              <th className="py-4 px-6 text-left">Designation</th>
              <th className="py-4 px-6 text-left">Task</th>
              <th className="py-4 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No records found
                </td>
              </tr>
            ) : (
              filteredAttendance.map((employee) => (
                <tr
                  key={employee._id}
                  className="border-t hover:bg-gray-200 hover:shadow-md transition duration-300"
                >
                  <td className="py-4 px-6">
                    <img
                      src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg"
                      alt={employee.employeeId?.name || "Profile"}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-4 px-6">
                    {employee.employeeId?.name || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    {employee.employeeId?.department || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    {employee.employeeId?.role || "N/A"}
                  </td>
                  <td className="py-4 px-6">{employee.task || "N/A"}</td>
                  <td className="py-4 px-6">
                    <select
                      value={employee.status}
                      onChange={(e) =>
                        handleStatusUpdate(employee._id, e.target.value)
                      }
                      className={`p-2 rounded-md ${getStatusClass(employee.status)}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
