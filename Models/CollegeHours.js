const mongoose = require("mongoose");

const CollegeHoursSchema = new mongoose.Schema(
  {
    programme: { type: String, required: true },
    noOfSemOrYear: { type: String },
    morningStart: { type: String },
    morningEnd: { type: String },
    afternoonStart: { type: String },
    afternoonEnd: { type: String },
    lectureDuration: { type: String },
    labDuration: { type: String },
    clinicalHospital: { type: String },
    clinicalCommunity: { type: String },
    flHour: { type: String },
    flMin: { type: String },
    flCont: { type: String },
    labHour: { type: String },
    labMin: { type: String },
    labCont: { type: String },
    clHour: { type: String },
    clMin: { type: String },
    clCont: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollegeHours", CollegeHoursSchema);