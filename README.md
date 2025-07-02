# Task Manager

## Setup Instructions

### Backend

1. **Navigate to the backend folder:**

   ```
   cd backend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=your_db_name
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ACCESS_TOKEN_EXPIRY=1d
   ```

4. **Start the backend server:**
   ```
   npm run dev
   ```

### Frontend

1. **Navigate to the frontend folder:**

   ```
   cd frontend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **(Optional) Update the `.env` file** in the `frontend` directory if your backend URL is different:

   ```
   BASE_URL="http://localhost:3000/api/v1"
   ```

4. **Start the frontend development server:**
   ```
   npm run dev
   ```

---

## Endpoints

### User Routes

- `POST /api/v1/users/signup`  
  Register a new user.

- `POST /api/v1/users/login`  
  Login user.

- `POST /api/v1/users/logout`  
  Logout user.

- `GET /api/v1/users/get-all-users`  
  Get all users.

- `GET /api/v1/users/get-user-by-id/:id`  
  Get user by ID.

- `POST /api/v1/users/check-role`  
  Check user role (requires authentication).

### Task Routes

- `POST /api/v1/task/create-task`  
  Create a new task (admin/manager only).

- `GET /api/v1/task/get-tasks`  
  Get all tasks (filtered by role).

- `POST /api/v1/task/update-status`  
  Update task status.

---
