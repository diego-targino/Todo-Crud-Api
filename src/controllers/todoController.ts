import { Request, Response } from "express";
import { TodoService } from "../services/todoService";
import { ListTodosResponseDTO } from "../dtos/response/todos/listTodosResponseDTO";
import { CreateTodoRequestDTO } from "../dtos/request/todos/createTodoRequestDTO";
import { EditTodoRequestDTO } from "../dtos/request/todos/editTodoRequestDTO";

export class TodoController {
  async getTodos(req: Request, res: Response): Promise<Response> {
    try {
      let { userId, categoryId } = req.headers;

      if (!userId)
        return res.status(400).send({ message: "Requisição inválida" });

      const listTodosRequest = {
        userId: userId?.toString(),
        categoryId: categoryId?.toString(),
      };

      const listTodosResponse: ListTodosResponseDTO =
        await new TodoService().listTodos(listTodosRequest);

      return res.status(200).send(listTodosResponse);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async createTodo(
    req: Request<any, any, CreateTodoRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      let createTodoRequestDTO = req.body;
      await new TodoService().createTodo(createTodoRequestDTO);

      return res.status(201).send({ message: "Tarefa criada com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async editTodo(
    req: Request<any, any, EditTodoRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      let editTodoRequestDTO: EditTodoRequestDTO = {
        ...req.body,
        id: req.params.id,
      };

      await new TodoService().editTodo(editTodoRequestDTO);

      return res.status(200).send({ message: "Tarefa editada com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<Response> {
    try {
      let todoId: string = req.params.id;

      await new TodoService().deleteTodo(todoId);

      return res.status(200).send({ message: "Tarefa excluída com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}
