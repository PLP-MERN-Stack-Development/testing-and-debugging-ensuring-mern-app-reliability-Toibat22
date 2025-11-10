// src/models/Bug.js
import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    reporter: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;
