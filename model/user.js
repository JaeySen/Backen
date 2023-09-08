
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    username : String,
    firstName: String,
    lastName: String,
    email : String,
    passwordHash : String,
    created: Number
    // phonecode : String,
    // phone : String,
    // country : String,
}, {versionKey:false});

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;