import { Request, Response } from "express";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";
import { container } from "tsyringe";

class CreateAdministratorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf } = request.body;
    const createAdministratorUseCase = container.resolve(CreateAdministratorUseCase);
    await createAdministratorUseCase.execute({ name, email, cpf });
  
    return response.status(201).send();
  }
}

export { CreateAdministratorController }