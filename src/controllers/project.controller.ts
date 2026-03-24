import { Request, Response } from "express";
import { createProject, getProjects } from "../services/project.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    // 🔥 DEBUG FIRST (before using req.body)
    console.log("PROJECT BODY:", req.body);

    // ❌ Safety check
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const { name, clientId } = req.body;

    if (!name || !clientId) {
      return res.status(400).json({ message: "name and clientId required" });
    }

    const project = await createProject(req.body, req.user);

    res.status(201).json(project);
  } catch (err: any) {
    console.log("PROJECT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await getProjects(req.user);
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};