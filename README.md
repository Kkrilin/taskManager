# Task Manager

Task Manager is a Node.js-based application that allows users to manage tasks with features like filtering, sorting, and pagination.

## Features

- User authentication with JWT
- Task creation, retrieval, updating, and deletion
- Filtering tasks by priority, status, and due date
- Sorting tasks by priority and due date
- Pagination for task listings

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd taskManager

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```bash
   PORT=3000
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   ```


Api Endpoints

Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

Task Management
- `GET /api/tasks`: Get all tasks (with optional filters, sorting, and pagination)
- `POST /api/tasks`: Create a new task
- `GET /api/tasks/:id`: Get a task by ID
- `PUT /api/tasks/:id`: Update a task by ID
- `DELETE /api/tasks/:id`: Delete a task by ID
Query Parameters for Filtering, Sorting, and Pagination
- `GET /api/tasks?priority=high`: Get tasks with high priority
- `GET /api/tasks?status=completed`: Get completed tasks
- `GET /api/tasks?dueDate=2023-10-01`: Get tasks due on a specific date
- `GET /api/tasks?sort=priority`: Get tasks sorted by priority
- `GET /api/tasks?sort=dueDate`: Get tasks sorted by due date
- `GET /api/tasks?page=1`: Get tasks with pagination (page 1, 10 tasks per page)


Development
run the application:
```bash
npm start
```
run eslint:
```bash
npm run lint
```
run prettier:
```bash
npm run format
```

license 
MIT License