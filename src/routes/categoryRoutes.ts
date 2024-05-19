import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

export const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.put("/:id", CategoryController.editCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);
