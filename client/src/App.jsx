import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheckSquare, FiSearch, FiFilter } from 'react-icons/fi';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskForm from './components/TaskForm';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './App.css';
import './components/TaskForm.css';
import './components/Auth.css';
import './components/Toolbar.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  // 1. CREATE Task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks([...tasks, response.data]); // Add new task to state immediately
      setIsModalOpen(false); // Close modal
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  // 2. UPDATE Task Status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await updateTask(taskId, { status: newStatus });
      // Update the specific task in our state array
      setTasks(tasks.map(t => t._id === taskId ? response.data : t));
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  // 3. DELETE Task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  // 4. Handle DRAG & DROP
  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      handleStatusChange(taskId, newStatus);
    }
  };

  // 5. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setTasks([]);
  };

  // If no user is logged in, show the Auth screen!
  if (!user) {
    return <Auth onLogin={(userData) => setUser(userData)} />;
  }

  // 6. Search & Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Calculate stats for Dashboard using the FILTERED tasks
  const todos = filteredTasks.filter(t => t.status === 'Todo');
  const inProgress = filteredTasks.filter(t => t.status === 'In Progress');
  const done = filteredTasks.filter(t => t.status === 'Done');

  const renderTask = (task) => (
    <div 
      key={task._id} 
      className="task-card glass-panel"
      draggable
      onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
    >
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      
      <div className="task-footer">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        
        <div className="task-actions">
          <button className="icon-btn delete" onClick={() => handleDeleteTask(task._id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1><FiCheckSquare /> TaskFlow</h1>
          <div className="nav-links">
            <button className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>Dashboard</button>
            <button className={`nav-link ${currentView === 'board' ? 'active' : ''}`} onClick={() => setCurrentView('board')}>Board</button>
          </div>
        </div>
        <div className="user-info">
          <span>Hello, {user.name.split(' ')[0]}</span>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <FiPlus style={{ marginRight: '5px' }} /> Add Task
          </button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {currentView === 'dashboard' ? (
        <Dashboard 
          tasks={tasks} 
          user={user} 
          onAddTask={() => setIsModalOpen(true)} 
          onViewBoard={() => setCurrentView('board')} 
        />
      ) : (
        <>
          {/* Toolbar: Dashboard Stats & Search/Filter */}
          <div className="toolbar">
        <div className="dashboard-stats glass-panel">
          <div className="stat"><span>Total:</span> {filteredTasks.length}</div>
          <div className="stat"><span>To Do:</span> {todos.length}</div>
          <div className="stat"><span>In Progress:</span> {inProgress.length}</div>
          <div className="stat"><span>Completed:</span> {done.length}</div>
        </div>

        <div className="filters">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <FiFilter className="filter-icon" />
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="board-container">
        
        <div className="kanban-column">
          <div className="column-header glass-panel todo">
            <span>To Do</span>
            <span className="task-count">{todos.length}</span>
          </div>
          <div 
            className="column-content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'Todo')}
          >
            {loading ? <p>Loading...</p> : todos.map(renderTask)}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header glass-panel inprogress">
            <span>In Progress</span>
            <span className="task-count">{inProgress.length}</span>
          </div>
          <div 
            className="column-content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'In Progress')}
          >
            {loading ? <p>Loading...</p> : inProgress.map(renderTask)}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header glass-panel done">
            <span>Done</span>
            <span className="task-count">{done.length}</span>
          </div>
          <div 
            className="column-content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'Done')}
          >
            {loading ? <p>Loading...</p> : done.map(renderTask)}
          </div>
        </div>

      </div>
        </>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <TaskForm 
          onSave={handleCreateTask} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
