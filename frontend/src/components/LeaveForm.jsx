import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveForm = ({ onClose }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");

  // Fetch employee list for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await axios.get("/api/employees");
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !leaveType || !startDate || !endDate || !reason) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", selectedEmployee);
    formData.append("leaveType", leaveType);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("reason", reason);
    if (document) formData.append("document", document);

    try {
      await axios.post(
        "http://localhost:5000/api/leaves",
        formData
      );
      alert("Leave request submitted successfully!");
      onClose(); // Close the form modal after submission
    } catch (err) {
      setError("Failed to submit leave request");
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Leave Request</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} - {emp.department}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Leave Type</label>
          <input
            type="text"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="e.g., Sick, Casual"
          />
        </div>

        <div className="mb-4 flex gap-4">
          <div>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium">
            Upload Document (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
