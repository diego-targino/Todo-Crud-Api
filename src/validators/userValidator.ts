import { LoginRequestDTO } from "../dtos/request/users/loginRequestDTO";
import { RegisterUserRequestDTO } from "../dtos/request/users/registerUserRequestDTO";

export class UserValidator {
  static loginValidator(loginRequestDTO: LoginRequestDTO): void {
    if (!loginRequestDTO.login)
      throw new Error("Você deve informar um email para logar");

    if (!loginRequestDTO.password)
      throw new Error("Você deve informar uma senha para logar");
  }

  static createuserValidator(
    registerUserRequestDTO: RegisterUserRequestDTO
  ): void {
    if (!registerUserRequestDTO.email)
      throw new Error("Você deve inserir um email para se cadastrar");

    if (!registerUserRequestDTO.name)
      throw new Error("Você deve inserir um nome para se cadastrar");

    if (!registerUserRequestDTO.password)
      throw new Error("Você deve inserir uma senha para se cadastrar");
  }
}
