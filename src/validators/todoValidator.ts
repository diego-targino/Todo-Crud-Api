import { CreateTodoRequestDTO } from "../dtos/request/todos/createTodoRequestDTO";
import { EditTodoRequestDTO } from "../dtos/request/todos/editTodoRequestDTO";

export class TodoValidator {
  static createTodoValidator(createTodoRequestDTO: CreateTodoRequestDTO): void {
    if (!createTodoRequestDTO.description)
      throw new Error("A descrição da tarefa é obrigatória");

    if (!createTodoRequestDTO.userId)
      throw new Error("A tarefa deve ser associada a um usuário");
  }

  static editTodoValidator(editTodoRequestDTO: EditTodoRequestDTO): void {
    if (!editTodoRequestDTO.id)
      throw new Error("É necessário informar o id da tarefa");

    if (!editTodoRequestDTO.description)
      throw new Error("Valor de descrição inválido");
  }
}
