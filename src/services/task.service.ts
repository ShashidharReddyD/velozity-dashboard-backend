import prisma from "../prisma/client";
import { Status } from "@prisma/client";

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
export const getTasks = async (user: any) => {
  if (user.role === "ADMIN") {
    return prisma.task.findMany({ include: { project: true } });
  }

  if (user.role === "PM") {
    return prisma.task.findMany({
      where: {
        project: { createdBy: user.id },
      },
      include: { project: true },
    });
  }

  if (user.role === "DEV") {
    return prisma.task.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  return [];
};

// 🔥 UPDATE STATUS
export const updateTaskStatus = async (taskId: number, status: Status) => {
  return prisma.task.update({
    where: { id: taskId },
    data: { status },
    select: {
      id: true,
      status: true,
    },
  });
};
