import cron from "node-cron";
import prisma from "./prisma/client";

export const startJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking overdue tasks...");

    await prisma.task.updateMany({
      where: {
        dueDate: { lt: new Date() },
        status: { not: "DONE" },
      },
      data: {
        status: "IN_PROGRESS", // or custom OVERDUE if added
      },
    });
  });
};