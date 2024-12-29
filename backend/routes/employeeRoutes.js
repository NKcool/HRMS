const express = require("express");
const multer = require("multer");
const fs = require("fs");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'files' directory if it doesn't exist
    const dir = "../frontend/public/files/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// CRUD Routes
router.post("/", protect, upload.single("profilePic"), createEmployee);
router.get("/", protect, getEmployees);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);

module.exports = router;
