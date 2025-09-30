import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";
import { sendResponse } from "../utils/responseHandler.js";

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ email });
    if (!admin || admin.status !== "active") {
      return sendResponse(res, 400, false, "Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return sendResponse(res, 400, false, "Invalid credentials");
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return sendResponse(res, 200, true, "Login successful", {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};

// Add New Admin
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, 400, false, "Name, email, and password are required");
    }
    const existing = await AdminUser.findOne({ email });
    if (existing) {
      return sendResponse(res, 400, false, "Admin with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminUser({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });
    await newAdmin.save();
    return sendResponse(res, 201, true, "Admin created successfully", {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};
