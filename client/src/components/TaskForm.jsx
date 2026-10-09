import React, { useState } from 'react';

const TaskForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({ title, description, priority, status: 'Todo' });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Build API" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Add details..."
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn-primary">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
