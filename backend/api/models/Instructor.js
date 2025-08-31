import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: String,
  profile_image: String,
});

export default mongoose.model("Savingsville-Instructor", instructorSchema);
