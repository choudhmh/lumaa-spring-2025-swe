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
## Video Link

Here an video example of how the completed project functions:

[📹 Demo Video](demo-video.md)

## 🚀 Project Setup

**1️⃣ Set Up the Database**
Prerequisites
- **Install PostgreSQL**
- **Install Node.js and npm**

clone the git project:
```
https://github.com/choudhmh/lumaa-spring-2025-swe
```

**1.2 Install Required Dependencies**

Most dependecies shoud come with it once cloned but if it doesn't work then you will have to install them.
Navigate to the backend folder and install necessary packages:
```
cd backend
```
then

```
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs class-validator class-transformer @prisma/client
```

And install Prisma ORM:

```
npm install @prisma/client
npm install -D prisma
```

**1.3 Set Up PostgreSQL Database**
   
I've used Docker as I did not wanted to install PostgreSQL:
```
docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=task_db -p 5432:5432 -d postgres
```

Or install PostgreSQL locally.

**1.4 Configure Prisma**
Initialize Prisma:
```
npx prisma init
```

## Configure Environment Variables

There is a .env file if it doesn't existe create a ```.env``` file in the backend directory and add the following:

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

**2.2 Install Required Packages**
We need libraries for API calls, authentication, and UI styling:

```
npm install axios react-router-dom @tanstack/react-query react-toastify tailwindcss
```
Initialize Tailwind CSS:

```
npx tailwindcss init -p
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
- E2EE Testing was done using Cypress - Registration, Login, Create Task, Update Task & Delete Task. **All worked perfectly!**
- Reminder for Cypress to work localhost must be changed to ```http://localhost:5173/```

  ## Testing Procedure
Testing was done using Cypress to make sure everything fully works according to the requirements. Cypress dependency is already installed in the package.json

To test the code fully, in one termninal make sure the application is running: 

```
for backend
npm run start:dev
```

Then on another terminal:

```
for frontend:
npm run dev
```

Open another terminal type this:
```
npx cypress open

```
This will launch the Cypress Test Runner.

Then navigate to the cypress E2E folder ``` cd cypress/e2e/ ```
and on the terminal run this:

```
npx cypress run
```
This setup should allow you to efficiently test 

Hope this is clear!

## Thank You, Happy Coding! ##
---
## Salary Expectation
I'm not much interested in the salary but more for to gain valuabe industry expereince on projects. Happy to discuss hours and salary during interview. At most around $1000 a month would be suficient for me depending on the hours or can work on project bases

---

