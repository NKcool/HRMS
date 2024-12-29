const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    leaveType: { type: String, required: true }, // Sick, Casual, etc.
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: { type: String, required: true },
    document: { type: String }, // Path to uploaded leave document (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
