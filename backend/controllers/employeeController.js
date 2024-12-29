const Employee = require("../models/Employee");
const Attendance = require('../models/Attendance')
// Create Employee
exports.createEmployee = async (req, res) => {
  const { name, email, phone, department, role } = req.body;
  const profilePic =req.file ? req.file.filename : "";
  
  try {
    const existEmployee = await Employee.findOne({ email})
    if(existEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    const employee = await Employee.create({
      profilePic ,
      name,
      email,
      phone,
      department,
      role,
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error creating employee" });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const { search, department, role } = req.query;

    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (department) query.department = department;
    if (role) query.role = role;

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error updating employee" });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete({ _id: req.params.id });
    // Remove attendance records of deleted employee
    await Attendance.deleteMany({ employeeId: id });
    res
      .status(200)
      .json({
        message: "Employee and related attendance records deleted successfully",
      });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};
