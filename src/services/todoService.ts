import { Todo } from "../database/Models/todo";
import { TodoRepository } from "../database/Repositories/todoRepository";
import { CreateTodoRequestDTO } from "../dtos/request/todos/createTodoRequestDTO";
import { EditTodoRequestDTO } from "../dtos/request/todos/editTodoRequestDTO";
import { ListTodosrequestDTO } from "../dtos/request/todos/listTodosRequestDTO";
import { ListTodosResponseDTO } from "../dtos/response/todos/listTodosResponseDTO";
import { TodoResponseDTO } from "../dtos/response/todos/todoResponseDTO";
import { TodoMaper } from "../mappers/todoMapper";
import { TodoValidator } from "../validators/todoValidator";

export class TodoService {
  todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async listTodos(
    listTodosrequestDTO: ListTodosrequestDTO
  ): Promise<ListTodosResponseDTO> {
    const todos: Todo[] = await this.todoRepository.GetTodoList(
      listTodosrequestDTO.userId,
      listTodosrequestDTO.categoryId
    );

    const todosDTO: TodoResponseDTO[] = todos.map((todo) => {
      return {
        id: todo._id!.toString(),
        completed: todo.completed,
        description: todo.description,
        categoryId: todo.categoryId,
      };
    });

    return { todos: todosDTO };
  }

  async createTodo(createTodoRequestDTO: CreateTodoRequestDTO): Promise<void> {
    TodoValidator.createTodoValidator(createTodoRequestDTO);

    let todo: Todo = TodoMaper.mapTodo(createTodoRequestDTO);

    await this.todoRepository.AddTodo(todo);
  }

  async editTodo(editTodoRequestDTO: EditTodoRequestDTO): Promise<void> {
    TodoValidator.editTodoValidator(editTodoRequestDTO);

    let todo = await this.todoRepository.GetTodoById(editTodoRequestDTO.id);

    if (todo == undefined) throw new Error("Tarefa não encontrada");

    todo.description = editTodoRequestDTO.description;
    todo.completed = editTodoRequestDTO.completed ?? false;
    todo.categoryId = editTodoRequestDTO.categoryId;

    await this.todoRepository.UpdateTodo(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todoRepository.DeleteTodo(id);
  }
}
