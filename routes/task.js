import express from "express";
import taskService from "../services/task.js";

const router = express();

router.post("/", taskService.createTask);
router.get("/", taskService.listAll);
router.get("/:id", taskService.findTask);
router.put("/:id", taskService.updateTask);
router.delete("/:id", taskService.deleteTask);
export default router;
