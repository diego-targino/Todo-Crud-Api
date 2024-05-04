import { Router } from "express";
import { TodoController } from "../controllers/todoController";

const controller = new TodoController();

export const todoRouter = Router();

todoRouter.get("/", controller.getTodos);
todoRouter.post("/", controller.createTodo);
todoRouter.put("/:id", controller.editTodo);
todoRouter.delete("/:id", controller.deleteTodo);
