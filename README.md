# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus on **correctness**, **functionality**, and **code clarity** rather than visual design.  
This challenge is intended to be completed within ~3 hours, so keep solutions minimal yet functional.

---

## 🚀 Project Setup

1️⃣ Set Up the Database
Prerequisites
Install PostgreSQL
Install Node.js and npm

## Configure Environment Variables

Create a .env file in the backend directory and add the following:

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

## Deliverables

1. **Fork the Public Repository**: **Fork** this repo into your own GitHub account.
2. **Implement Your Solution** in the forked repository. Make sure you're README file has:
   - Steps to set up the database (migrations, environment variables).
   - How to run the backend.
   - How to run the frontend.
   - Any relevant notes on testing.
   - Salary Expectations per month (Mandatory)
3. **Short Video Demo**: Provide a link (in a `.md` file in your forked repo) to a brief screen recording showing:
   - Registering a user
   - Logging in
   - Creating, updating, and deleting tasks
4. **Deadline**: Submissions are due **Sunday, Feb 23th 11:59 pm PST**.

> **Note**: Please keep your solution minimal. The entire project is intended to be completed in around 3 hours. Focus on core features (registration, login, tasks CRUD) rather than polished UI or extra features.

---

## Evaluation Criteria

1. **Functionality**  
   - Does registration and login work correctly (with password hashing)?
   - Are tasks protected by authentication?
   - Does the tasks CRUD flow work end-to-end?

2. **Code Quality**  
   - Is the code structured logically and typed in TypeScript?
   - Are variable/function names descriptive?

3. **Clarity**  
   - Is the `README.md` (in your fork) clear and detailed about setup steps?
   - Easy to run and test?

4. **Maintainability**  
   - Organized logic (controllers/services, etc.)
   - Minimal hard-coded values

Good luck, and we look forward to your submission!
