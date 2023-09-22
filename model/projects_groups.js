const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectGroupSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    // groupsList: [{ type: Schema.Types.ObjectId, ref: "groups", required: true }],
    group: { type: Schema.Types.ObjectId, ref: "groups", required: true },
    role: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("projects_groups", projectGroupSchema);
