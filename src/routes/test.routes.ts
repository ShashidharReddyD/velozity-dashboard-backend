import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { create, getAll, updateStatus } from "../controllers/task.controller";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.patch("/:id/status", authenticate, updateStatus);

export default router;