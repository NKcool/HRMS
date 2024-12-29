const express = require("express");
const {
  createAttendance,
  getAttendanceRecords,
  updateAttendance,
  addAttendance,
} = require("../controllers/attendanceController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// add employeeId to the attendance record
router.get("/add-attendance", protect, addAttendance);
router.post("/", protect, createAttendance);
router.get("/", protect, getAttendanceRecords);
router.put("/:id", protect, updateAttendance);

module.exports = router;
