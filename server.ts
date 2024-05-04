import express from "express";
import { userRouter } from "./src/routes/userRoutes";
import { todoRouter } from "./src/routes/todoRoutes";

export const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
