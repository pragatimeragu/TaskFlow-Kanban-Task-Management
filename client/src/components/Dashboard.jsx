import React from 'react';
import { 
  FiList, 
  FiClock, 
  FiActivity, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiPlus, 
  FiArrowRight, 
  FiTrendingUp,
  FiTarget
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = ({ tasks, user, onAddTask, onViewBoard }) => {
  const calculateDaysStuck = (inProgressSince) => {
    if (!inProgressSince) return 0;
    const start = new Date(inProgressSince).getTime();
    const now = Date.now();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  };

  const stuckTasks = tasks
    .filter((task) => task.status === 'In Progress' && task.inProgressSince)
    .map((task) => ({
      ...task,
      daysStuck: calculateDaysStuck(task.inProgressSince),
    }))
    .filter((task) => task.daysStuck > 3)
    .sort((a, b) => b.daysStuck - a.daysStuck);

  const totalTasks = tasks.length;
  const todos = tasks.filter(t => t.status === 'Todo').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Done').length;
  
  const highPriority = tasks.filter(t => t.priority === 'High').length;
  const medPriority = tasks.filter(t => t.priority === 'Medium').length;
  const lowPriority = tasks.filter(t => t.priority === 'Low').length;

  const getPercent = (count) => totalTasks === 0 ? 0 : Math.round((count / totalTasks) * 100);

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="dash-wrapper">
      {/* HEADER */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">{getGreeting()}, {firstName}! 👋</h1>
          <p className="dash-subtitle">Here's an overview of your tasks and productivity.</p>
        </div>
        <button className="btn-primary add-task-btn" onClick={onAddTask}>
          <FiPlus /> Add Task
        </button>
      </div>

      {/* STATS GRID */}
      <div className="dash-stats-grid">
        <div className="stat-card">
          <div className="stat-icon list-icon"><FiList /></div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <span className="stat-num">{totalTasks}</span>
            <p className="stat-desc">All your tasks</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon todo-icon"><FiClock /></div>
          <div className="stat-info">
            <h3>To Do</h3>
            <span className="stat-num">{todos}</span>
            <p className="stat-desc">Ready to start</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon prog-icon"><FiActivity /></div>
          <div className="stat-info">
            <h3>In Progress</h3>
            <span className="stat-num">{inProgress}</span>
            <p className="stat-desc">Currently working</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon done-icon"><FiCheckCircle /></div>
          <div className="stat-info">
            <h3>Completed</h3>
            <span className="stat-num">{completed}</span>
            <p className="stat-desc">Successfully completed</p>
          </div>
        </div>

        <div className="stat-card warning-card">
          <div className="stat-icon alert-icon"><FiAlertCircle /></div>
          <div className="stat-info">
            <h3>Stuck Tasks</h3>
            <span className="stat-num">{stuckTasks.length}</span>
            <p className="stat-desc">Needs attention</p>
          </div>
        </div>
      </div>

      <div className="dash-main-grid">
        {/* LEFT COLUMN */}
        <div className="dash-col-left">
          
          <div className="dash-card">
            <div className="card-header">
              <h2><FiTrendingUp /> Productivity Overview</h2>
            </div>
            <div className="progress-section">
              <div className="progress-item">
                <div className="prog-label">
                  <span>To Do</span>
                  <span>{getPercent(todos)}%</span>
                </div>
                <div className="prog-bar-bg">
                  <div className="prog-bar-fill todo-fill" style={{ width: `${getPercent(todos)}%` }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="prog-label">
                  <span>In Progress</span>
                  <span>{getPercent(inProgress)}%</span>
                </div>
                <div className="prog-bar-bg">
                  <div className="prog-bar-fill prog-fill" style={{ width: `${getPercent(inProgress)}%` }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="prog-label">
                  <span>Completed</span>
                  <span>{getPercent(completed)}%</span>
                </div>
                <div className="prog-bar-bg">
                  <div className="prog-bar-fill done-fill" style={{ width: `${getPercent(completed)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dash-card">
            <div className="card-header">
              <h2 className="alert-text"><FiAlertCircle /> Tasks Needing Attention</h2>
            </div>
            {stuckTasks.length > 0 ? (
              <div className="stuck-list">
                {stuckTasks.map((task) => (
                  <div key={task._id} className="stuck-item">
                    <h4>{task.title}</h4>
                    <p className="stuck-meta">
                      <span className={`priority-dot p-${task.priority.toLowerCase()}`}></span> {task.priority} &bull; In Progress for {task.daysStuck} days
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state success">
                <FiCheckCircle className="empty-icon" />
                <p className="empty-title">No stuck tasks</p>
                <p className="empty-desc">All tasks are progressing normally.</p>
              </div>
            )}
          </div>
          
          <div className="dash-card">
             <div className="card-header">
              <h2>⚡ Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <button className="qa-btn primary" onClick={onAddTask}>
                <FiPlus /> Create Task
              </button>
              <button className="qa-btn secondary" onClick={onViewBoard}>
                View Board <FiArrowRight />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="dash-col-right">
          
          <div className="dash-card">
            <div className="card-header">
              <h2><FiTarget /> Priority Overview</h2>
            </div>
            <div className="priority-list">
              <div className="pri-item">
                <div className="pri-label">
                  <span className="priority-dot p-high"></span> High
                </div>
                <span className="pri-count">{highPriority}</span>
              </div>
              <div className="pri-item">
                <div className="pri-label">
                  <span className="priority-dot p-medium"></span> Medium
                </div>
                <span className="pri-count">{medPriority}</span>
              </div>
              <div className="pri-item">
                <div className="pri-label">
                  <span className="priority-dot p-low"></span> Low
                </div>
                <span className="pri-count">{lowPriority}</span>
              </div>
            </div>
          </div>

          <div className="dash-card">
            <div className="card-header">
              <h2><FiClock /> Recent Tasks</h2>
            </div>
            {recentTasks.length > 0 ? (
              <div className="recent-list">
                {recentTasks.map(task => (
                  <div key={task._id} className="recent-item">
                    <div className="recent-header">
                      <h4>{task.title}</h4>
                      <span className={`badge s-${task.status.replace(' ', '').toLowerCase()}`}>{task.status}</span>
                    </div>
                    <div className="recent-meta">
                      <span className="recent-pri">
                        <span className={`priority-dot p-${task.priority.toLowerCase()}`}></span> {task.priority}
                      </span>
                      <span className="recent-date">Created {formatDate(task.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-desc">No tasks created yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
