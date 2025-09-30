import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import AdminUser from "./api/models/AdminUser.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/savingsville";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    const email = "admin@example.com";
    const password = "admin123";
    const name = "Admin";
    const role = "admin";

    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log("Admin already exists:", email);
      await mongoose.disconnect();
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new AdminUser({
      name,
      email,
      password: hashedPassword,
      role,
      status: "active",
    });
    await admin.save();
    console.log("Seeded admin:", email, "/ password:", password);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAdmin();
