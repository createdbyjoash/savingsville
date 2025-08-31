import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(res, 401, false, "No token, authorization denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user object to request
    req.user = await User.findById(decoded.id).select("-password -otp -otpExpiry");
    if (!req.user) {
      return sendResponse(res, 401, false, "User not found");
    }

    next();
  } catch (err) {
    return sendResponse(res, 401, false, "Invalid token", null, err.message);
  }
};