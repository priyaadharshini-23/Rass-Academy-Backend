const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  programme: String,
  year: String,
  month: String,
  semester: String,
  count: String,
});

module.exports = mongoose.model("Course", courseSchema);