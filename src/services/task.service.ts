import prisma from "../prisma/client";
import { Status } from "@prisma/client";
import { getIO } from "../socket";

// 🔹 CREATE TASK
export const createTask = async (data: any, user: any) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: "TODO",
      priority: data.priority,
      dueDate: new Date(data.dueDate),
      projectId: data.projectId,
      assignedTo: data.assignedTo,
    },
    select: {
      id: true,
      title: true,
      status: true,
    },
  });
};

// 🔹 GET TASKS
export const getTasks = async (user: any, query: any) => {
  const { status, priority, startDate, endDate } = query;

  const where: any = {};

  if (user.role === "PM") {
    where.project = { createdBy: user.id };
  }

  if (user.role === "DEV") {
    where.assignedTo = user.id;
  }

  if (status) where.status = status;
  if (priority) where.priority = priority;

  if (startDate && endDate) {
    where.dueDate = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  return prisma.task.findMany({
    where,
    include: { project: true },
  });
};

// 🔥 UPDATE STATUS
export const updateTaskStatus = async (taskId: number, status: Status) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  // 🔥 prevent duplicate updates
  if (existingTask?.status === status) {
    return existingTask;
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });

  // 🔥 log only real change
  await prisma.activityLog.create({
    data: {
      taskId: taskId,
      userId: updatedTask.assignedTo,
      fromStatus: existingTask?.status || status,
      toStatus: status,
    },
  });

  // 🔥 socket event
  try {
    const io = getIO();
    io.to(`user_${updatedTask.assignedTo}`).emit("taskUpdated", {
      taskId,
      status,
    });
  } catch (err) {
    console.log("Socket not initialized yet");
  }

  return updatedTask;
};

export const getActivityFeed = async (user: any) => {
  let where: any = {};

  // 🔹 DEV → only their tasks
  if (user.role === "DEV") {
    where.task = {
      assignedTo: user.id,
    };
  }

  // 🔹 PM → only their projects
  if (user.role === "PM") {
    where.task = {
      project: {
        createdBy: user.id,
      },
    };
  }

  // 🔹 ADMIN → no filter

  return prisma.activityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};
