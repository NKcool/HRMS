const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const fs = require("fs");
const path = require("path");

// Create Leave Request
exports.createLeave = async (req, res) => {
  const { employeeId, leaveType, startDate, endDate, reason } = req.body;
  const document = req.file ? req.file.filename : null;

  try {
    const leave = await Leave.create({ employeeId, leaveType, startDate, endDate, reason, document });
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: 'Error creating leave request' });
  }
};

// Get Leaves (With Filters)
exports.getLeaves = async (req, res) => {
  
  try {
   const leaves = await Leave.find()
      .populate("employeeId")
      .sort({ startDate: 1 });
    res.json(leaves);
   
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaves" });
  }
};

// Update Leave Status
exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: "Error updating leave" });
  }
};

// Download Leave Document
exports.downloadLeaveDoc = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave || !leave.document) {
      return res.status(404).json({ message: "Document not found" });
    }
    const docPath = path.join(__dirname, `../uploads/${leave.document}`);
    res.download(docPath);
  } catch (err) {
    res.status(500).json({ message: "Error downloading document" });
  }
};
