const express = require("express");
const router = express.Router();
const Course = require("../Models/CourseModel");

// GET all
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// POST single or bulk
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const saved = await Course.insertMany(req.body);
      res.json(saved);
    } else {
      const saved = await Course.create(req.body);
      res.json(saved);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;