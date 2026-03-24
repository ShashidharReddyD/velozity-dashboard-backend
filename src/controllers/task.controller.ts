import { Response } from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getActivityFeed, // ✅ ADD THIS
} from "../services/task.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Status } from "@prisma/client";

// UPDATE TASK STATUS
export const updateStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (isNaN(Number(id))) {
    throw { statusCode: 400, message: "Invalid task id" };
  }

  if (!status) {
    throw { statusCode: 400, message: "Status required" };
  }

  if (!["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"].includes(status)) {
    throw { statusCode: 400, message: "Invalid status value" };
  }

  const task = await updateTaskStatus(Number(id), status as any);

  res.json(task);
};

// 🔥 CREATE TASK
export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { title, dueDate, projectId, assignedTo } = req.body;

    // 🔴 required fields
    if (!title?.trim() || !projectId || !assignedTo) {
      return res.status(400).json({
        message: "title, projectId, and assignedTo are required",
      });
    }

    // 🔴 date validation
    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: "Invalid dueDate format",
      });
    }

    const task = await createTask(req.body, req.user);

    res.status(201).json(task);
  } catch (err: any) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GET TASKS
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await getTasks(req.user , req.query);
    res.json(tasks);
  } catch (err: any) {
    console.log("GET TASKS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await getActivityFeed(req.user);
    res.json(logs);
  } catch (err: any) {
    console.log("FEED ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};