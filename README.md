# 🚀 Task Management Backend (RBAC + Activity Logs)

## 📌 Overview

A scalable backend system for managing clients, projects, and tasks with role-based access control (RBAC) and activity logging.

---

## 🛠 Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication

---

## 🔐 Features

* User Authentication (JWT)
* Role-Based Access Control (ADMIN, PM, DEV)
* Client → Project → Task hierarchy
* Task lifecycle management (TODO → IN_PROGRESS → DONE)
* Activity logging for task updates
* Input validation and error handling

---

## 📂 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Clients

* POST `/api/clients`
* GET `/api/clients`

### Projects

* POST `/api/projects`
* GET `/api/projects`

### Tasks

* POST `/api/tasks`
* GET `/api/tasks`
* PATCH `/api/tasks/:id/status`

### Logs

* GET `/api/tasks/logs`

---

## ⚙️ Setup Instructions

1. Clone repo:

```bash
git clone <your-repo-link>
```

2. Install dependencies:

```bash
npm install
```

3. Setup `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_secret
```

4. Run migrations:

```bash
npx prisma migrate dev
```

5. Start server:

```bash
npm run dev
```

---

## 📈 Future Improvements

* Pagination & filtering
* Real-time updates (WebSockets)
* Notifications system
* Frontend integration

---

## 👨‍💻 Author

SHASHIDHAR REDDY D
