const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
      name: String,
      authorization: String,
      type: String,
    },
    { versionKey: false }
  ),
  "roles"
);

module.exports = Role;
