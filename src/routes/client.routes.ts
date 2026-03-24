import express from "express";
import { create, getAll } from "../controllers/client.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);

export default router;