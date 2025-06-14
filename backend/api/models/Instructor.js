const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: String,
  profile_image: String,
});

module.exports = mongoose.model("Savingsville-Instructor", instructorSchema);
