const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnership = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "user", require: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", require: true },
    collaborator: [],
  },
  { versionKey: false }
);

const Partnership = mongoose.model("Partnership", partnership, "partnerships");

module.exports = Partnership;
