import express from "express";
const router = express.Router();
import {tasksController} from "../controller/taskController.js";

router.get("/", tasksController.getTasks.bind(tasksController));
router.post("/", tasksController.createTask.bind(tasksController));
router.put("/:id/", tasksController.updateTask.bind(tasksController));
router.get("/:id/", tasksController.getTask.bind(tasksController));

export const taskRoutes = router;