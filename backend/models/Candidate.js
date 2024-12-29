const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  resume: { type: String }, // Path to uploaded resume
  status: { type: String, default: "Pending" }, // Pending, Selected, Rejected
  experience: { type: String, required: true },
  dateApplied: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Candidate", candidateSchema);
