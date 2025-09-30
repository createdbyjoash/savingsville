
import mongoose from "mongoose";


const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reg_date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
});

export default mongoose.model("Savingsville-AdminUser", adminUserSchema);
