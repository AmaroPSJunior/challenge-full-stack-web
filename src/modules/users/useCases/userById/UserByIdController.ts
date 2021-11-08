import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserByIdUseCase } from "./UserByIdUseCase";

class UserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userByIdUseCase = container.resolve(UserByIdUseCase);
    const users = await userByIdUseCase.execute({ id });
  
    return response.status(201).json(users);
  }
}

export { UserByIdController }