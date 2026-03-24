import { Request, Response } from "express";
import prisma from "../prisma/client";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (user.role === "ADMIN") {
      const totalProjects = await prisma.project.count();
      const totalTasks = await prisma.task.count();

      const statusCounts = await prisma.task.groupBy({
        by: ["status"],
        _count: true,
      });

      const overdueTasks = await prisma.task.count({
        where: {
          dueDate: { lt: new Date() },
          status: { not: "DONE" },
        },
      });

      return res.json({
        totalProjects,
        totalTasks,
        statusCounts,
        overdueTasks,
      });
    }

    if (user.role === "PM") {
      const projects = await prisma.project.findMany({
        where: { createdBy: user.id },
        include: {
          tasks: true,
        },
      });

      return res.json(projects);
    }

    if (user.role === "DEV") {
      const tasks = await prisma.task.findMany({
        where: { assignedTo: user.id },
        orderBy: { dueDate: "asc" },
      });

      return res.json(tasks);
    }

    res.json({});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};