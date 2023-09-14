
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username : String,
    firstName: String,
    lastName: String,
    email : String,
    passwordHash : String,
    created: Number,
    // role: { type: Schema.Types.ObjectId, ref: "roles" }
    role: String
    // phonecode : String,
    // phone : String,
    // country : String,
});

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;