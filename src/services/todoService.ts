import { Todo } from "../database/Models/todo";
import { TodoRepository } from "../database/Repositories/todoRepository";
import { CreateTodoRequestDTO } from "../dtos/request/todos/createTodoRequestDTO";
import { EditTodoRequestDTO } from "../dtos/request/todos/editTodoRequestDTO";
import { ListTodosrequestDTO } from "../dtos/request/todos/listTodosRequestDTO";
import { ListTodosResponseDTO } from "../dtos/response/todos/listTodosResponseDTO";
import { TodoResponseDTO } from "../dtos/response/todos/todoResponseDTO";
import { TodoMaper } from "../mappers/todoMapper";
import { TodoValidator } from "../validators/todoValidator";
import { TagService } from "./tagService";
import { CategoryService } from "./categoryService";

export class TodoService {
  todoRepository: TodoRepository;
  tagService: TagService;
  categoryService: CategoryService;

  constructor() {
    this.todoRepository = new TodoRepository();

    this.tagService = new TagService();
    this.categoryService = new CategoryService();
  }

  async listTodos(
    listTodosrequestDTO: ListTodosrequestDTO
  ): Promise<ListTodosResponseDTO> {
    const todos: Todo[] = await this.todoRepository.GetTodoList(
      listTodosrequestDTO.userId,
      listTodosrequestDTO.categoryId
    );

    const todosDTO: TodoResponseDTO[] = await Promise.all(
      todos.map(async (todo) => await this.getTodoAdditionalData(todo))
    );

    return { todos: todosDTO };
  }

  async createTodo(createTodoRequestDTO: CreateTodoRequestDTO): Promise<void> {
    TodoValidator.createTodoValidator(createTodoRequestDTO);

    let todo: Todo = TodoMaper.mapTodo(createTodoRequestDTO);
    await this.todoRepository.AddTodo(todo);

    if (createTodoRequestDTO.tags)
      await this.tagService.createTags(
        createTodoRequestDTO.tags,
        todo._id!.toString()
      );
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

    await this.tagService.deleteTagsByTodo(id);
  }

  private async getTodoAdditionalData(todo: Todo): Promise<TodoResponseDTO> {
    const tagsResponse = await this.tagService.GetTagList(todo._id!.toString());

    let categoryResponse = undefined;

    if (todo.categoryId)
      categoryResponse = await this.categoryService.GetCategoryById(
        todo.categoryId
      );

    return {
      id: todo._id!.toString(),
      completed: todo.completed,
      description: todo.description,
      category: categoryResponse,
      tags: tagsResponse,
    };
  }
}
