const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationGroupSchema = new Schema({
  name: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: "project",
    require: true,
  },
});

module.exports = new mongoose.model(
  "OrganizationsGroups",
  organizationGroupSchema,
  "organizations_groups"
);

