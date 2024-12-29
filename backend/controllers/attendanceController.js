const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
// Create Attendance Record
exports.createAttendance = async (req, res) => {
  const { employeeId, date, status, task } = req.body;
  try {
    const attendance = await Attendance.create({
      employeeId,
      date,
      status,
      task,
    });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Error creating attendance record" });
  }
};

// Get Attendance Records
exports.getAttendanceRecords = async (req, res) => {
  try {
    

    const records = await Attendance.find().populate("employeeId");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance records" });
  }
};

// Update Attendance Record
exports.updateAttendance = async (req, res) => {
  
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Error updating attendance record" });
  }
};

exports.addAttendance = async (req, res) => {
  try {
    const employees = await Employee.find();
    
   const attendance = await Attendance.find();
 const filteredAttendance = employees.filter(
   (employee) =>
     !attendance.some((record) => record.employeeId.equals(employee._id))
 );



    const attendanceRecords = filteredAttendance.map((employee) => ({
      employeeId: employee._id,
      date: new Date(),
      status: "Present", // Default status, you can change it as needed
      task: "Daily tasks", // Default task, you can change it as needed
    }));

    await Attendance.insertMany(attendanceRecords);

    res.status(201).json({ message: "Attendance records added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
