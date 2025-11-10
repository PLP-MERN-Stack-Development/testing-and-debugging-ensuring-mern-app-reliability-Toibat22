import express from "express";
import Bug from "../models/Bug.js"; // fixed import path

const router = express.Router();

// Create a new Bug
router.post("/", async (req, res) => {
  try {
    console.log("Incoming bug data:", req.body); // log frontend payload

    const bug = await Bug.create(req.body);

    // Return a simplified object with 'id' instead of '_id' for tests
    res.status(201).json({
      id: bug._id,
      title: bug.title,
      description: bug.description,
      status: bug.status,
      reporter: bug.reporter,
    });
  } catch (err) {
    console.error("Error creating bug:", err.message);
    res.status(500).json({ message: "Error creating bug", error: err.message });
  }
});


//  Get all Bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
  } catch (err) {
    console.error("Error fetching bugs:", err.message);
    res.status(500).json({ message: "Error fetching bugs", error: err.message });
  }
});

//  Update a Bug by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBug) return res.status(404).json({ message: "Bug not found" });
    res.status(200).json(updatedBug);
  } catch (err) {
    console.error("Error updating bug:", err.message);
    res.status(500).json({ message: "Error updating bug", error: err.message });
  }
});

//  Delete a Bug by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBug = await Bug.findByIdAndDelete(req.params.id);
    if (!deletedBug) return res.status(404).json({ message: "Bug not found" });
    res.status(200).json({ message: "Bug deleted successfully" });
  } catch (err) {
    console.error("Error deleting bug:", err.message);
    res.status(500).json({ message: "Error deleting bug", error: err.message });
  }
});

export default router;
