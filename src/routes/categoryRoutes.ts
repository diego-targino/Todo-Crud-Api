import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const controller = new CategoryController();

export const categoryRouter = Router();

categoryRouter.get("/", controller.getCategories);
categoryRouter.post("/", controller.createCategory);
categoryRouter.put("/:id", controller.editCategory);
categoryRouter.delete("/:id", controller.deleteCategory);
