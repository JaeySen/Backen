const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationSchema = new Schema(
  {
    name: String,
    description: String,
    created: Number,
  },
  { versionKey: false },
);

module.exports = new mongoose.model('Organization', organizationSchema, 'organizations');
