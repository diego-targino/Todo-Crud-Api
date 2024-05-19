import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { userRouter } from "./src/routes/userRoutes";
import { todoRouter } from "./src/routes/todoRoutes";
import { categoryRouter } from "./src/routes/categoryRoutes";

export const app: express.Application = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL,
  })
);

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
