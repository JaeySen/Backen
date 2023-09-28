const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: ['modular', 'coordinator', 'manager'],
  },
});

const Authorization = new mongoose.model('Authorization', authorizationSchema, 'authorizations');

module.exports = Authorization;
