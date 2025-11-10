import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bugRoutes from "./src/routes/bugRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";

dotenv.config();
const app = express();

//  Enable CORS (allow frontend requests)
app.use(
  cors({
    origin: "http://localhost:5173", // your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//  Middleware
app.use(express.json());

//  Routes
app.use("/api/bugs", bugRoutes);
app.use("/api/posts", postRoutes);

// Connect to MongoDB (skip in test mode)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
      );
    })
    .catch((err) => console.log("MongoDB connection error:", err));
}

export default app; // important for tests
