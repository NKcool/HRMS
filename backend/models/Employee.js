const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  profilePic: { type: String, default: "" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true }, // HR, Developer, etc.
  status: { type: String, default: "Active" }, // Active, Inactive
  joinDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
