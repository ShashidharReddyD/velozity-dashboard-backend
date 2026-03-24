# 🚀 Task Management Backend (RBAC + Activity Logs)

## 📌 Overview

A scalable backend system for managing **clients, projects, and tasks** with secure authentication, role-based access control (RBAC), and activity tracking.

This project demonstrates **real-world backend architecture** including modular design, middleware usage, and database relations.

---

## ⭐ Highlights

* JWT-based authentication system
* Role-Based Access Control (ADMIN, PM, DEV)
* Structured relational data model (Client → Project → Task)
* Activity logging for task status transitions
* Centralized error handling using middleware
* Optimized API responses using Prisma `select`
* Input validation for secure APIs

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Auth:** JWT (JSON Web Tokens)

---

## 🔐 Features

* User Authentication (Register/Login)
* Role-Based Authorization
* Client & Project Management
* Task Assignment & Lifecycle Management
* Activity Logs for tracking status updates
* Input validation & error handling

---

## 📂 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 👥 Clients

* POST `/api/clients`
* GET `/api/clients`

### 📁 Projects

* POST `/api/projects`
* GET `/api/projects`

### 📌 Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* PATCH `/api/tasks/:id/status`

### 📜 Logs

* GET `/api/tasks/logs`

---

## 🔎 Sample API Usage

### 🔐 Login

POST `/api/auth/login`

```json
{
  "email": "admin2@test.com",
  "password": "1234"
}
```

**Response**

```json
{
  "accessToken": "JWT_TOKEN"
}
```

---

### 📌 Create Task

POST `/api/tasks`

Headers:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "title": "Task 1",
  "description": "First task",
  "priority": "HIGH",
  "dueDate": "2026-04-01",
  "projectId": 3,
  "assignedTo": 3
}
```

---

### 🔄 Update Task Status

PATCH `/api/tasks/2/status`

```json
{
  "status": "DONE"
}
```

---

### 📜 Get Activity Logs

GET `/api/tasks/logs`

---

## ⚙️ Setup Instructions

1. Clone repository:

```bash
git clone <your-repo-link>
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_secret
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start development server:

```bash
npm run dev
```

---

## 📈 Future Improvements

* Pagination & filtering for large datasets
* Real-time updates using WebSockets
* Notification system
* Frontend dashboard (React)

---

## 👨‍💻 Author

**Shashidhar Reddy D**
