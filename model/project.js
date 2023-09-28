const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: String,
  server_location: String,
  description: String,
  created: String,
  start_date: Number,
  end_date: Number,
  partnership_id: { type: Schema.Types.ObjectId, ref: 'partnerships', required: true }
  // admin: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

module.exports = mongoose.model('Project', projectSchema, 'projects');
