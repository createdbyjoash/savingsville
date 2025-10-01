import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/mailer.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body);

    const { name, email, password } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    console.log("🔑 Generated OTP:", otp, " Expiry:", otpExpiry);

    // Only require name, email, password
    if (!name || !email || !password) {
      console.warn("⚠️ Missing required fields:", { name, email, password });
      return sendResponse(
        res,
        400,
        false,
        "Name, email, and password are required"
      );
    }

    // Check if user already exists
    console.log("🔍 Checking if user exists:", email);
    const existingUser = await User.findOne({ email });
    console.log("👤 Existing user found:", existingUser ? existingUser._id : null);

    if (existingUser && existingUser.isVerified) {
      console.log("❌ User already registered and verified.");
      return sendResponse(res, 400, false, "Login. Email already registered");
    }

    if (existingUser && !existingUser.isVerified) {
      console.log("⏳ User exists but not verified. Updating OTP...");
      // Update OTP and expiry
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();

      console.log("📧 Sending OTP email to:", email);
      await sendEmail({
        to: email,
        subject: "Verify your email - Savingsville",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
      });

      console.log("✅ OTP email sent to unverified user");
      return sendResponse(
        res,
        201,
        true,
        "User registered. OTP sent to email."
      );
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false, // make sure user has to verify
    });

    console.log("🆕 Creating new user:", newUser.email);
    await newUser.save();
    console.log("✅ New user saved with ID:", newUser._id);

    // Send OTP email
    console.log("📧 Sending OTP email to new user:", email);
    await sendEmail({
      to: email,
      subject: "Verify your email - Savingsville",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    });

    console.log("✅ OTP email sent successfully");

    return sendResponse(res, 201, true, "User registered. OTP sent to email.");
  } catch (err) {
    console.error("💥 Error in registerUser:", err.message, err.stack);
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 400, false, "User not found");

    if (user.isVerified) {
      return sendResponse(res, 400, false, "User already verified");
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    // ✅ Mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // ✅ Issue JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return sendResponse(res, 200, true, "Email verified successfully", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return sendResponse(res, 400, false, "Invalid credentials");
    if (!user.isVerified)
      return sendResponse(res, 403, false, "Please verify your email first");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 400, false, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.total_logins += 1;
    await user.save();

    return sendResponse(res, 200, true, "Login successful", {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendResponse(res, 400, false, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (user.isVerified) {
      return sendResponse(res, 400, false, "User already verified");
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    try {
      await sendEmail({
        to: email,
        subject: "Your new OTP - Savingsville",
        text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your new OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
      });
    } catch (mailErr) {
      console.error("Email send error:", mailErr.message);
      return sendResponse(
        res,
        502,
        false,
        "Failed to send OTP email. Please check your network connection and try again.",
        null,
        mailErr.message
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "A new OTP has been sent to your email."
    );
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};
