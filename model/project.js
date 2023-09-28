const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: String,
  server_location: String,
  description: String,
  created_at: String,
  start_date: String,
  end_date: String,
  partner_id: { type: Schema.Types.ObjectId, ref: 'partnerships', required: true }
}, {
  versionKey: false
});

module.exports = mongoose.model('Project', projectSchema, 'projects');
