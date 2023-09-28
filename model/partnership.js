const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnershipSchema = new Schema(
  {
    // project: { type: Schema.Types.ObjectId, ref: 'projects' },
    owner_id: { type: Schema.Types.ObjectId, ref: 'organizations', require: true },
    // collaborator: { type: Schema.Types.ObjectId, ref: 'organizations', require: true },
    created_at: Number,
    description: String
  },
  { versionKey: false }
);

module.exports = new mongoose.model('Partnership', partnershipSchema, 'partnerships');
