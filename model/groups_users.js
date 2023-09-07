const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupUserSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: "groups" },
    user: { type: Schema.Types.ObjectId, ref: "users" },
})

module.exports = mongoose.model('groups_users', groupUserSchema);