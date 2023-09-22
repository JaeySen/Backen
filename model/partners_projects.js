const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerProject = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "partner", require: true },
    project: { type: Schema.Types.ObjectId, ref: "project", require: true },
  },
  { versionKey: false }
);

const Partners_Users = mongoose.model(
  "Partners_Projects",
  partnerProject,
  "partners_projects"
);

module.exports = Partners_Users;
