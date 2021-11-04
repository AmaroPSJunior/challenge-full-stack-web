import { Request, Response } from "express";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

class CreateAdministratorController {
  constructor(private createAdministratorUseCase: CreateAdministratorUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email, ra, cpf } = request.body;
    const newAdministrator = this.createAdministratorUseCase.execute({ name, email, cpf });
  
    return response.status(201).json(newAdministrator);
  }
}

export { CreateAdministratorController }