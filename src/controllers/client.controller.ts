import { Request, Response } from "express";
import prisma from "../prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    const client = await prisma.client.create({
      data: { name },
    });

    res.status(201).json(client);
  } catch (err: any) {
    console.log("CLIENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
};