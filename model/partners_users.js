const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerUser = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "partner", require: true },
    user: { type: Schema.Types.ObjectId, ref: "user", require: true },
  },
  { versionKey: false }
);

const Partners_Users = mongoose.model(
  "Partners_Users",
  partnerUser,
  "partners_users"
);

module.exports = Partners_Users;
