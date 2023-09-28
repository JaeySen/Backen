const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    assigner: String,
    assignee: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'hight'],
      default: 'low',
      required: true,
    },
    deadline: Date,
    created_at: {
      type: Date,
      default: Date.now,
    },
    created_by: String,
    updated_at: {
      type: Date,
      default: Date.now,
    },
    updated_by: String,
  },
  { versionKey: false },
);

/**
 * @type {mongoose.Model}
 */
const Todo = new mongoose.model('Todo', todoSchema, 'todos');

module.exports = Todo;
