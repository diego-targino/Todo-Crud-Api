import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { LoginRequestDTO } from "../dtos/request/users/loginRequestDTO";
import { RegisterUserRequestDTO } from "../dtos/request/users/registerUserRequestDTO";

export class UserController {
  async login(
    req: Request<any, any, LoginRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      const loginRequestDTO = req.body;

      const loginResponseDTO = await new UserService().login(loginRequestDTO);

      return res.status(200).send(loginResponseDTO);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async createUser(
    req: Request<any, any, RegisterUserRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      const registerUserRequestDTO = req.body;

      await new UserService().createUser(registerUserRequestDTO);

      return res
        .status(201)
        .send({ message: "Usuário cadastriado com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}
