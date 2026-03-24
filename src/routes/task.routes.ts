import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { create, getAll, updateStatus } from "../controllers/task.controller";

const router = express.Router();

// 🔥 MAIN TASK ROUTES
router.post("/", authenticate, create);
router.get("/", authenticate, getAll);

// 🔥 UPDATE TASK STATUS
router.patch("/:id/status", authenticate, updateStatus);

// 🔥 OPTIONAL ROLE TEST (you can keep or remove)
router.get("/admin", authenticate, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get("/pm", authenticate, authorizeRoles("PM"), (req, res) => {
  res.json({ message: "Welcome PM" });
});

router.get("/dev", authenticate, authorizeRoles("DEV"), (req, res) => {
  res.json({ message: "Welcome Developer" });
});

export default router;