const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'projects', required: true},
    created: Number
    // authorization: [{ type: Schema.Types.ObjectId, ref: "group_access" }]
})

// module.exports = mongoose.model('groups', groupSchema);

module.exports = new mongoose.model('Group', groupSchema, 'groups');
