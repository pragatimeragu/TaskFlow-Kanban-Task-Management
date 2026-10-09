const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    required: false, // Optional
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo',
  },
  dueDate: {
    type: Date,
    required: false,
  },
  inProgressSince: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', taskSchema);
