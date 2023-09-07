const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    name: String,
    created: Number,
    authorization: [{ type: Schema.Types.ObjectId, ref: "group_access" }]
})

module.exports = mongoose.model('groups', groupSchema);
