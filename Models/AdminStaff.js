const mongoose = require("mongoose");

const AdminStaffSchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    photo:    { type: String, default: "" }, // base64 or URL
    name:     { type: String, required: true },
    address:  { type: String, default: "" },
    mobile:   { type: String, default: "" },
    aadhar:   { type: String, default: "" },
    pan:      { type: String, default: "" },
    doj:      { type: String, default: "" }, // date of joining
    dor:      { type: String, default: "" }, // date of relieving
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminStaff", AdminStaffSchema);