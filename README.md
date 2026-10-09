# TaskFlow - Full Stack Kanban Board

![TaskFlow Screenshot](./screenshot.png) *(Note: Add a screenshot of your app here!)*

TaskFlow is a premium, full-stack Kanban Task Management application built with the MERN stack. It features a modern Glassmorphism UI, real-time drag-and-drop functionality, and secure JWT-based authentication.

## 🚀 Features

- **Secure Authentication:** User registration and login using encrypted passwords (bcrypt) and JWT.
- **Interactive Kanban Board:** Drag and drop tasks between "To Do", "In Progress", and "Done" columns.
- **Real-time Dashboard:** Dynamic statistics tracking the number of tasks in each status.
- **Search & Filter:** Instantly filter tasks by title or prioritize (High/Medium/Low).
- **Premium UI/UX:** Responsive, dark-mode design built with raw CSS utilizing glassmorphism aesthetics.
- **RESTful API:** Fully functional Express backend connected to MongoDB Atlas.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Axios, React Icons, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JSON Web Tokens (JWT), bcryptjs

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Setup the Backend
Open a terminal and navigate to the server folder:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your MongoDB connection string and a secret key:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow
JWT_SECRET=your_super_secret_key
```
Start the server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
```
Start the React application:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## 🏗️ Architecture

- **MVC Pattern:** The backend strictly follows the Model-View-Controller architecture.
- **State Management:** React hooks (`useState`, `useEffect`) manage local state and API hydration.
- **Axios Interceptors:** Automatic injection of JWT tokens for all outbound API requests.
