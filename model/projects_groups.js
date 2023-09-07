const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectGroupSchema = new Schema({
    project: { type: Schema.Types.ObjectId, ref: "projects" },
    group: { type: Schema.Types.ObjectId, ref: "groups" },
})

module.exports = mongoose.model('projects_groups', projectGroupSchema);