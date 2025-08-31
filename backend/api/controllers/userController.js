import User from "../models/User.js";

import { sendResponse } from "../utils/responseHandler.js";

export const getMe = async (req, res) => {
  try {
    return sendResponse(res, 200, true, "User profile fetched successfully", req.user);
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};



export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ comes from authMiddleware
    const { username, preferred_language, age_group } = req.body;

    // Only allow specific fields to be updated
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (preferred_language !== undefined) updates.preferred_language = preferred_language;
    if (age_group !== undefined) updates.age_group = age_group;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -otp -otpExpiry");

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "Profile updated successfully", user);
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};
