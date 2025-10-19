import express from "express";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../controllers/todoController.js";
 import authMiddleware from "../middlewares/authMiddleware.js";

const todoRouter = express.Router();

todoRouter.get("/", authMiddleware, getTodos);
todoRouter.post("/", authMiddleware, addTodo);
todoRouter.patch("/:id", authMiddleware, toggleTodo);
todoRouter.delete("/:id", authMiddleware, deleteTodo);

export default todoRouter;
