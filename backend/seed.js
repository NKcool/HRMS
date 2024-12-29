const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");
const candidates = require("./candidates.json");
const Employee = require("./models/Employee");
const employees = require("./employees.json");




const seedDB = async () => {
  await Candidate.deleteMany({});
  await Candidate.insertMany(candidates);
  await Employee.deleteMany({});
  await Employee.insertMany(employees);
 
  console.log("Database seeded!");
    process.exit();
};

module.exports = seedDB;

// Run the seed script by executing the following command in your terminal:
// node backend/seed.js
