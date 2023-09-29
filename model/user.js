const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: String,
  first_name: String,
  last_name: String,
  avatar: String,
  email: String,
  phone: String,
  password_hash: String,
  create_at: String,
  role: String,
  is_admin: Boolean,
});

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;
