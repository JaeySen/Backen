const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'users', require: true },
    description: String,
    create_at: Number,
  },
  { versionKey: false },
);

module.exports = new mongoose.model('Partner', partnerSchema, 'partners');
