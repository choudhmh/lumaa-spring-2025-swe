# Full-Stack Coding Challenge

---

## Overview

Had to create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application contains:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus is not on the design but on the functionality making sure everythign works perfectly
---

## 🚀 Project Setup

1️⃣ Set Up the Database
Prerequisites
- **Install PostgreSQL**
- **Install Node.js and npm**

## Configure Environment Variables

Create a ```.env``` file in the backend directory and add the following:

```
DATABASE_URL="postgresql://admin:admin@localhost:5432/task_db"
JWT_SECRET="your_super_secret_key"
```

### Run Migrations
Use Prisma to set up the database schema:
```
npx prisma migrate dev --name init
```
## 2️⃣ Run the Backend
Navigate to the backend directory:
```
cd backend
```
Install dependencies
```
npm install

```
Start the server
```
npm run start:dev
```
By default, the backend will be running on ```http://localhost:3000```

## 3️⃣ Run the Frontend (React + TypeScript)

Navigate to the frontend directory
```
cd frontend
```
Install dependencies
```
npm install
```
Start the server
```
npm run dev
```
By default, the frontend will be running on ```http://localhost:5173```


---

