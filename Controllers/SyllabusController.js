const Syllabus = require("../models/Syllabus");

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await Syllabus.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await Syllabus.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// POST — single object OR array (bulk import)
exports.create = async (req, res) => {
  try {
    const body = req.body;

    if (Array.isArray(body)) {
      // Bulk import: validate each has programme + subject
      const invalid = body.filter((r) => !r.programme || !r.subject);
      if (invalid.length) {
        return res.status(400).json({
          message: `${invalid.length} row(s) missing programme or subject`,
        });
      }
      const inserted = await Syllabus.insertMany(body);
      return res.status(201).json(inserted);
    }

    // Single record
    if (!body.programme || !body.subject) {
      return res.status(400).json({ message: "Programme and Subject are required" });
    }
    const created = await Syllabus.create(body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

// PUT — update by ID
exports.update = async (req, res) => {
  try {
    const updated = await Syllabus.findByIdAndUpdate(
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
    const deleted = await Syllabus.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};