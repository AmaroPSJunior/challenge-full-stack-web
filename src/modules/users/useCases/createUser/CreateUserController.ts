import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, email, phone, cpf, ra, profile, active } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({ id, name, email, phone, cpf, ra, profile, active });
    if (id != null) return response.status(200).send();

    return response.status(201).send();
  }
}

export { CreateUserController }