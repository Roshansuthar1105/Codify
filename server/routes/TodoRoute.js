import express from "express";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../controllers/TodoController.js";
 import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, addTodo);
router.patch("/:id", authMiddleware, toggleTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
