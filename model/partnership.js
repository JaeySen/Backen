const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnershipSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "projects", require: true },
    owner: { type: Schema.Types.ObjectId, ref: "organizations", require: true },
    collaborator: { type: Schema.Types.ObjectId, ref: "organization", require: true },
  },
  { versionKey: false }
);

module.exports = new mongoose.model("Partnership", partnershipSchema, "partnerships");
