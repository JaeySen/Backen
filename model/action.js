const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionSchema = new Schema({
    scope: {
        type: String,
        enum: ["project", "group", "topic", "comment"]
    },
    // authorization: [
    //     {
    //         type: String, 
    //         enum: ["createComment", "createViewpoint", "createTopic", "update"]
    //     }
    // ],
    action: String,
    type: [
        {
            type: String,
            enum: ['default', 'custom']
        }
    ],
    group: { type: Schema.Types.ObjectId, ref: "groups" }
})

module.exports = mongoose.model('Action', actionSchema, 'actions');