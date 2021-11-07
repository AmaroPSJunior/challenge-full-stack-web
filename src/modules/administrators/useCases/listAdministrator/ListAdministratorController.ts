import { Request, Response } from "express";
import { ListAdministratorUseCase } from "./ListAdministratorUseCase";
import { container } from "tsyringe";

class ListAdministratorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAdministratorUseCase = container.resolve(ListAdministratorUseCase);
    const administrator = await listAdministratorUseCase.execute();
  
    return response.status(200).json(administrator);
  }
}

export { ListAdministratorController }