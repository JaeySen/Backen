const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerGroupSchema = new Schema({
  name: String,
  role: {
    type: String,
    enum: ['modulor', 'coordinator', 'manager']
  },
  created_at: String,
  partner_id: { type: Schema.Types.ObjectId, ref: 'partnerships', required: true },
  users: [ { type: Schema.Types.ObjectId, ref: 'users' } ]
}, {
  versionKey: false
});

module.exports = mongoose.model('PartnerGroup', partnerGroupSchema, 'partners_groups');
