import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute(user);
    if (user.id != null) return response.status(200).send();

    return response.status(201).send();
  }
}

export { CreateUserController }