const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectGroupSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    groupList: { type: Schema.Types.ObjectId, ref: "groups", required: true },
    role: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("projects_groups", projectGroupSchema);
