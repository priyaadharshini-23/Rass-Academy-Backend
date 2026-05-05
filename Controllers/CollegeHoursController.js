const CollegeHours = require("../models/CollegeHours");

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await CollegeHours.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", error: err.message });
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await CollegeHours.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// POST — single or bulk
exports.create = async (req, res) => {
  try {
    const body = req.body;

    // Bulk import support (array from Excel)
    if (Array.isArray(body)) {
      const inserted = await CollegeHours.insertMany(body);
      return res.status(201).json(inserted);
    }

    if (!body.programme || body.programme.trim() === "") {
      return res.status(400).json({ message: "Programme is required" });
    }

    const newEntry = await CollegeHours.create(body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

// PUT — update by ID
exports.update = async (req, res) => {
  try {
    const updated = await CollegeHours.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// DELETE — by ID
exports.remove = async (req, res) => {
  try {
    const deleted = await CollegeHours.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};