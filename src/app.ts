import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import projectRoutes from "./routes/project.routes";
import clientRoutes from "./routes/client.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// 🔥 ALWAYS FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes); // move here

// 🔥 LAST
app.use(errorHandler);

export default app;