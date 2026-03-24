import prisma from "../prisma/client";

export const createProject = async (data: any, user: any) => {
  return prisma.project.create({
    data: {
      name: data.name,
      clientId: data.clientId,
      createdBy: user.id, // 🔥 IMPORTANT
    },
  });
};

export const getProjects = async (user: any) => {
  if (user.role === "ADMIN") {
    return prisma.project.findMany({
      include: { tasks: true },
    });
  }

  if (user.role === "PM") {
    return prisma.project.findMany({
      where: { createdBy: user.id },
      include: { tasks: true },
    });
  }

  return []; // DEV can't see projects directly
};