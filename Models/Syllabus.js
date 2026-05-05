const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  unitNumber:   { type: String },
  unitName:     { type: String },
  speciality:   { type: String },   // category
  content:      { type: String },
  lectureHours: { type: Number, default: 0 },
  labHours:     { type: Number, default: 0 },
  unitExam:     { type: String, default: "No" },
});

const SyllabusSchema = new mongoose.Schema(
  {
    programme: { type: String, required: true },
    type:      { type: String, default: "Semester" }, // "Semester" | "Year"
    levelName: { type: String },   // e.g. "1", "2", "Semester 1"
    subject:   { type: String, required: true },
    units:     [UnitSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Syllabus", SyllabusSchema);