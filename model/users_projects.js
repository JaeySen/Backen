const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProjectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
    accessLevel: Number,
  },
  { versionKey: false },
);

module.exports = mongoose.model('users_projects', userProjectSchema);
