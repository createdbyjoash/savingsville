const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  user_type: { type: String, enum: ['instructor', 'parent', 'student'] },
  reg_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'disabled'] },
});

module.exports = mongoose.model("Savingsville-AdminUser", adminUserSchema);
