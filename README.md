# TaskFlow – Kanban Task Management System

TaskFlow is a full-stack MERN application designed to organize, manage, and track tasks through a visual Kanban board.

## Features

- **User Authentication:** Secure registration and login using JWT authentication and password hashing.
- **Task Management:** Create, view, update, and delete tasks.
- **Kanban Board:** Manage tasks across To Do, In Progress, and Done columns.
- **Drag and Drop:** Move tasks between statuses.
- **Priority Management:** Organize tasks by Low, Medium, and High priority.
- **Search and Filter:** Find tasks and filter them by priority.
- **Dashboard Analytics:** View task statistics, status breakdowns, recent tasks, and priority summaries.
- **Stuck Task Detection:** Identify tasks that remain In Progress for more than three days.

## Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Version Control:** Git, GitHub

## Project Structure

```text
TaskFlow/
├── client/       # React frontend
├── server/       # Express backend and APIs
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/pragatimeragu/TaskFlow-Kanban-Task-Management.git
cd TaskFlow-Kanban-Task-Management
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Replace the example values with your own credentials. Never commit your `.env` file.

### 3. Start the backend

```bash
npm run dev
```

Use the start command defined in `server/package.json` if `npm run dev` is unavailable.

### 4. Configure and start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Future Improvements

- Due dates and overdue task reminders
- Task activity history
- Enhanced productivity analytics
- AI-powered task assistance

## Author

**Pragati Meragu**

[GitHub](https://github.com/pragatimeragu)

---

*Built as a full-stack project to practice MERN development, REST APIs, authentication, database integration, and task management workflows.*