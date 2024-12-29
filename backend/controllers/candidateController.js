const Candidate = require("../models/Candidate");
const fs = require("fs");

const PDFDocument = require("pdfkit");

// Create Candidate
exports.createCandidate = async (req, res) => {
  
  try {
    
    const { name, email, phone, position, experience } = req.body;
    const resume = req.file ? req.file.filename : null;

    // Log the resume path to verify it
    

    // Create a new candidate with the uploaded resume
    const candidate = await Candidate.create({
      name,
      email,
      phone,
      position,
      experience,
      resume,
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Candidates
exports.getCandidates = async (req, res) => {
  
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Error fetching candidates" });
  }
};

// Get Candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Error fetching candidate" });
  }
};

// Update Candidate
exports.updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Error updating candidate" });
  }
};

// Delete Candidate
exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting candidate" });
  }
};

// Download Resume as PDF
exports.downloadResume = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    const pdfPath = path.join(__dirname, `../uploads/${candidate.resume}`);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.download(pdfPath);
  } catch (err) {
    res.status(500).json({ message: "Error downloading resume" });
  }
};

// Generate PDF Resume (Optional)
exports.generateResumePDF = async (req, res) => {
  const candidateId = req.params.id;
  const candidate = await Candidate.findById(candidateId);
  if (!candidate)
    return res.status(404).json({ message: "Candidate not found" });

  const doc = new PDFDocument();
  const filePath = path.join(
    __dirname,
    `../uploads/${candidate.name}-resume.pdf`
  );
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(24).text(`Resume - ${candidate.name}`, { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Email: ${candidate.email}`);
  doc.text(`Phone: ${candidate.phone}`);
  doc.text(`Position: ${candidate.position}`);
  doc.text(`Status: ${candidate.status}`);
  doc.end();

  stream.on("finish", () => {
    res.download(filePath);
  });
};

