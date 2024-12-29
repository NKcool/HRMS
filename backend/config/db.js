const mongoose = require("mongoose");
// const seedDB = require("../seed");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // seedDB();
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
