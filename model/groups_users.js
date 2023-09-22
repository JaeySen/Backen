const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupUserSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "groups", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    created: Number,
    role: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("groups_users", groupUserSchema);
