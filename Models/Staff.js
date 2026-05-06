const mongoose = require("mongoose");

const QualificationSchema = new mongoose.Schema({
  degree:      { type: String },
  year:        { type: String },
  institution: { type: String },
  rn:          { type: String },
  rm:          { type: String },
  nuid:        { type: String },
});

const StaffSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true },
    photo:           { type: String, default: "" },      // base64 or URL
    address:         { type: String, default: "" },
    mobile:          { type: String, default: "" },
    email:           { type: String, default: "" },
    social:          { type: String, default: "" },
    active:          { type: Boolean, default: true },
    qualifications:  { type: [QualificationSchema], default: [] },
    aadhar:          { type: String, default: "" },
    pan:             { type: String, default: "" },
    dateOfJoining:   { type: String, default: "" },
    dateOfRelieving: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);