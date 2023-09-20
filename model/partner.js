const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema({
  name: String,
  description: String,
  created: Number,
});

const Partner = mongoose.model("Partner", partnerSchema, "partners");
module.exports = Partner;
