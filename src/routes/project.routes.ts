import express from "express";
import { create, getAll } from "../controllers/project.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = express.Router();

// Only Admin & PM can create
router.post("/", authenticate, authorizeRoles("ADMIN", "PM"), create);

// Admin & PM can view
router.get("/", authenticate, authorizeRoles("ADMIN", "PM"), getAll);

export default router;