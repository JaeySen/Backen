const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new Schema(
  {
    owner_id: { type: Schema.Types.ObjectId, ref: 'users', require: true },
    name: { type: String, require: true},
    created_at: String,
    description: String
  },
  { versionKey: false }
);

module.exports = new mongoose.model('Partner', partnerSchema, 'partners');
