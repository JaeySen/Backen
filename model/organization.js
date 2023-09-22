const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: String,
  description: String,
  created: Number,
});

const Organization = mongoose.model(
  "Organization",
  organizationSchema,
  "organizations"
);
module.exports = Organization;
