const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectGroupSchema = new Schema(
  {
    name: String,
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
    group_pool: [{ type: Schema.Types.ObjectId, ref: 'partners_groups' }],
  },
  { versionKey: false },
);

module.exports = mongoose.model('Projects_Groups', projectGroupSchema);
