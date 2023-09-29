const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerGroupSchema = new Schema({
  name: { type: String, required: true },
  partner: { type: Schema.Types.ObjectId, ref: 'partners' },
  users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = new mongoose.model('partners_groups', partnerGroupSchema, 'partners_groups');
