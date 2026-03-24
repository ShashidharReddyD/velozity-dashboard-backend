import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getDashboard } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", authenticate, getDashboard);

export default router;