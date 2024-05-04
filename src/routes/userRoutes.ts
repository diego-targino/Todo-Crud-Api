import { Router } from "express";
import { UserController } from "../controllers/userController";

const controller = new UserController();

export const userRouter = Router();

userRouter.post("/", controller.createUser);
userRouter.post("/login", controller.login);
