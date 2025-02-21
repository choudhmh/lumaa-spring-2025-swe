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
   
3. Focus is not on the design but on the functionality making sure everything works perfectly

---
## 🚀 Project Setup

1️⃣ Set Up the Database
Prerequisites
- **Install PostgreSQL**
- **Install Node.js and npm**

   1.2 Install Required Dependencies
Navigate to the backend folder and install necessary packages:
```
cd backend
```

```
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs class-validator class-transformer @prisma/client
```

And install Prisma ORM:

```
npm install @prisma/client
npm install -D prisma
```

   1.3 Set Up PostgreSQL Database
   
I've used Docker as I did not wanted to install PostgreSQL:

```
docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=task_db -p 5432:5432 -d postgres
``
Or install PostgreSQL locally.

   1.4 Configure Prisma
Initialize Prisma:

```
npx prisma init
```

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
---
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

---
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

## 4️⃣ Testing Notes
- Use ideally something like Postman (or cURL) to test API endpoints.
- Ensure that CORS is enabled on the backend for API calls to work properly.
- Test authentication by logging in and using the JWT token in headers.
- Check the dashboard to verify that tasks update correctly.

