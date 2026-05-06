const mongoose = require("mongoose");

const ExternalStaffSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true },
    address:       { type: String, default: "" },
    mobile:        { type: String, default: "" },
    email:         { type: String, default: "" },
    qualification: { type: String, default: "" },
    disabled:      { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExternalStaff", ExternalStaffSchema);