const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const required = true;

const todoSchema = new Schema({
  title: {
    type: String,
    required,
  },
  description: {
    type: String,
    required,
  },
  assigner: {
    type: ObjectId,
    ref: 'User',
  },
  assignees: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  priority: {
    type: String,
    enum: ['low', 'medium', 'hight'],
    default: 'low',
  },
  deadline: Date,
  status: {
    type: String,
    enum: ['new', 'doing', 'done', 'closed'],
    default: 'new',
  },
  type: {
    type: String,
    enum: ['comment', 'issue', 'request', 'clash', 'undefined'],
    default: 'undefined',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: ObjectId,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: ObjectId,
  },
});

/**
 * @type {mongoose.Model}
 */
const Todo = new mongoose.model('Todo', todoSchema, 'todos');

module.exports = Todo;
