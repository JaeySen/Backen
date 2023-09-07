const mongoose = require('mongoose');
const { Schema } = mongoose;

const bimSnippetSchema = new Schema({
    snippetType: String,
    isExternal: Boolean,
    reference: String,
    referenceSchema: String
})

const authorizationSchema = new Schema({
    topicActions: [
        {
            type: String, 
            enum: ["createComment", "createViewpoint"]
        }
    ]
})


const topicSchema = new Schema({
    globalId: String,
    serverAssignedId: String,
    creationAuthorEmail: String,
    creationDate: Date, 
    topicType: {
        type: String,
        enum: ["Clash"],
        default: "Clash"
    },
    title: String,
    priority: {
        type: String,
        enum: ['Low', 'Mid', "High"],
        default: 'Low'
    },
    labels: [{ type: String, enum: ['Architecture', 'Heating'] }],
    assignedToEmail: String,
    bimSnippet: bimSnippetSchema,
    authorization: {authorizationSchema}
})

module.exports = mongoose.model('topicss', topicSchema);
