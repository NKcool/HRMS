const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  downloadResume,
  generateResumePDF,
} = require("../controllers/candidateController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' directory if it doesn't exist
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
router.post(
  "/",
  protect,
  upload.single("document"),
  (req, res, next) => {
    // Log the file information to verify the upload
    
    next();
  },
  createCandidate
);
router.get("/", protect, getCandidates);
router.get("/:id", protect, getCandidateById);
router.put("/:id", protect, updateCandidate);
router.delete("/:id", protect, deleteCandidate);

// Resume Routes
router.get("/:id/download", protect, downloadResume);
router.get("/:id/generate-pdf", protect, generateResumePDF);

module.exports = router;
