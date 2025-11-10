import express from "express";
import cors from "cors";
import bugRoutes from "./routes/bugRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

//  Enable CORS (allow requests from frontend)
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//  Middleware
app.use(express.json());

//  Routes
app.use("/api/bugs", bugRoutes);
app.use("/api/posts", postRoutes);

//  Root route (optional - for testing)
app.get("/", (req, res) => {
  res.send("Bug Tracker API is running ");
});

export default app;
