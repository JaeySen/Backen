const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationGroup = new Schema({
  name: String,
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: "project",
    require: true,
  },
});

const Organizations_Groups = mongoose.model(
  "Organizations_Groups",
  organizationGroup,
  "organizations_groups"
);

module.exports = Organizations_Groups;
