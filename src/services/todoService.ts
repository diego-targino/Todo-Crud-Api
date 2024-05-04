import { Todo } from "../database/Models/todo";
import { TodoRepository } from "../database/Repositories/todoRepository";
import { CreateTodoRequestDTO } from "../dtos/request/todos/createTodoRequestDTO";
import { EditTodoRequestDTO } from "../dtos/request/todos/editTodoRequestDTO";
import { ListTodosResponseDTO } from "../dtos/response/todos/listTodosResponseDTO";

import { TodoMaper } from "../mappers/todoMapper";
import { TodoValidator } from "../validators/todoValidator";

export class TodoService {
  todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async ListTodos(userId: string): Promise<ListTodosResponseDTO> {
    let todos: Todo[] = await this.todoRepository.GetTodoList(userId);
    return { todos };
  }

  async AddTodo(createTodoRequestDTO: CreateTodoRequestDTO): Promise<void> {
    TodoValidator.createTodoValidator(createTodoRequestDTO);

    let todo: Todo = TodoMaper.mapTodo(createTodoRequestDTO);

    await this.todoRepository.AddTodo(todo);
  }

  async UpdateTodo(editTodoRequestDTO: EditTodoRequestDTO): Promise<void> {
    TodoValidator.editTodoValidator(editTodoRequestDTO);

    let todo = await this.todoRepository.GetTodoById(editTodoRequestDTO.id);

    if (todo == undefined) throw new Error("Tarefa não encontrada");

    todo.description = editTodoRequestDTO.description;
    todo.completed = editTodoRequestDTO.completed;

    await this.todoRepository.UpdateTodo(todo);
  }

  async DeleteTodo(id: string): Promise<void> {
    await this.todoRepository.DeleteTodo(id);
  }
}
