const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnership = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "projects", require: true },
    owner: { type: Schema.Types.ObjectId, ref: "organizations", require: true },
    collaborator: { type: Schema.Types.ObjectId, ref: "organization", require: true },
  },
  { versionKey: false }
);

const Partnership = mongoose.model("Partnership", partnership, "partnerships");

module.exports = Partnership;
