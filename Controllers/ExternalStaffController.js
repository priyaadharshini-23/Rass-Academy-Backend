const ExternalStaff = require("../models/ExternalStaff");

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await ExternalStaff.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// GET by ID
exports.getById = async (req, res) => {
  try {
    const item = await ExternalStaff.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// POST — single OR array (bulk Excel import)
exports.create = async (req, res) => {
  try {
    const body = req.body;

    if (Array.isArray(body)) {
      const invalid = body.filter((r) => !r.name || !String(r.name).trim());
      if (invalid.length)
        return res.status(400).json({ message: `${invalid.length} row(s) missing name` });
      const inserted = await ExternalStaff.insertMany(body);
      return res.status(201).json(inserted);
    }

    if (!body.name || !body.name.trim())
      return res.status(400).json({ message: "Name is required" });

    const created = await ExternalStaff.create(body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Create failed", error: err.message });
  }
};

// PUT — update by ID
exports.update = async (req, res) => {
  try {
    const updated = await ExternalStaff.findByIdAndUpdate(
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

// PATCH — toggle disabled
exports.toggleDisable = async (req, res) => {
  try {
    const item = await ExternalStaff.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    item.disabled = !item.disabled;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Toggle failed", error: err.message });
  }
};

// DELETE — by ID
exports.remove = async (req, res) => {
  try {
    const deleted = await ExternalStaff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};