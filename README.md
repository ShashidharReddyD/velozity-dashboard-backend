# 🚀 Task Management Backend (RBAC + Activity Logs)

## 📌 Overview

A scalable backend system for managing **clients, projects, and tasks** with secure authentication, role-based access control (RBAC), and real-time activity tracking.

This project demonstrates **production-level backend architecture** including modular design, middleware usage, database relations, and real-time communication.

---

## ⭐ Highlights

* JWT-based authentication system
* Role-Based Access Control (ADMIN, PM, DEV)
* Structured relational model (Client → Project → Task)
* Real-time updates using Socket.io
* Activity logging for task status transitions
* Centralized error handling middleware
* Query-based filtering & dashboard APIs

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT
* **Real-time:** Socket.io
* **Scheduler:** node-cron

---

## 🔐 Features

* User Authentication (Register/Login)
* Role-Based Authorization
* Client & Project Management
* Task Assignment & Lifecycle Management
* Activity Logs for tracking status changes
* Real-time task updates (WebSocket)
* Dashboard APIs (Admin, PM, Dev)
* Filtering support (status, priority, date range)
* Background job for overdue tasks
* Input validation & centralized error handling

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

### 📜 Activity Feed

* GET `/api/tasks/feed`

### 📊 Dashboard

* GET `/api/dashboard`

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

### 📜 Get Activity Feed

GET `/api/tasks/feed`

---

## ⚡ Real-Time Updates

* Implemented using Socket.io
* Emits `taskUpdated` event on task status change
* Role-based event delivery (only assigned user receives updates)

---

## 📊 Dashboard API

* **Admin:** total projects, tasks, status breakdown, overdue tasks
* **PM:** project-wise task overview
* **Developer:** assigned tasks sorted by due date

---

## 🔍 Filtering Support

Supports query-based filtering:

* `status`
* `priority`
* `startDate` & `endDate`

Example:

```
GET /api/tasks?status=TODO&priority=HIGH
```

---

## ⏱ Background Job

* Runs using cron scheduler
* Checks overdue tasks every minute
* Automatically updates task status if needed

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

* Pagination for large datasets
* Notification system
* Frontend dashboard (React)
* Deployment (AWS / Render)

---

## 👨‍💻 Author

**Shashidhar Reddy D**
