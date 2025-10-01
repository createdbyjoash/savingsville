// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();


import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import connectDB from "./utils/db.js";


const app = express();


console.log("ENV TEST:", process.env.CLOUDINARY_CLOUD_NAME);
// ============ Middleware ============
const allowedOrigins = [
  "http://localhost:3000",
  "https://savingsville.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // concise colored logs
} else {
  app.use(morgan("combined")); // Apache-style logs (better for production)
}

// ============ Routes ============
import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/upload", uploadRoutes);


// Root health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Savingsville API is running" });
});

// ============ Error Handling ============
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Something went wrong!",
    error: err.message,
  });
});

// ============ Start Server ============
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
