const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupAccessSchema = new Schema({
  role: String,
  authorization: [String],
});

module.exports = mongoose.model("group_Access", groupAccessSchema);
