import cloudinary from "../utils/cloudinaryConfig.js";
import fs from "fs";

// Upload file (thumbnail or video)
export const uploadFile = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);

    const file = req.file;
    const type = req.body.type; // "image" or "video"

    if (!file || !type) {
      return res.status(400).json({ success: false, error: "Missing file or type" });
    }

    // Upload to Cloudinary with optimization
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      resource_type: type === "video" ? "video" : "image",
      folder: "savingsville-lessons",
      // ✅ optimization settings
      quality: "auto",       // auto-compress intelligently
      fetch_format: "auto",  // auto-convert (e.g. to WebP/AVIF for images)
    });

    // ✅ Delete the temp file after upload
    fs.unlink(file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    return res.json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, error: "Upload failed" });
  }
};
