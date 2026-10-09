const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const taskData = {
      user: req.user.id,
      title,
      description,
      priority,
      status,
      dueDate
    };

    if (status === 'In Progress') {
      taskData.inProgressSince = new Date();
    }

    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check for user ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updateData = { ...req.body };

    if (updateData.status) {
      if (updateData.status === 'In Progress' && task.status !== 'In Progress') {
        updateData.inProgressSince = new Date();
      } else if (updateData.status !== 'In Progress') {
        updateData.inProgressSince = null;
      }
    }

    task = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true // Ensures the new data meets our schema rules
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check for user ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
