const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ['modular', 'coordinator', 'manager'],
  },
});

/**
 * @type {mongoose.Model}
 */

const Authorization = new mongoose.model('Authorization', authorizationSchema, 'authorizations');

module.exports = Authorization;
