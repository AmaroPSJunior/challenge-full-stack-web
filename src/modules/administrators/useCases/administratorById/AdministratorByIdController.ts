import { Request, Response } from "express";
import { AdministratorByIdUseCase } from "./AdministratorByIdUseCase";
import { container } from "tsyringe";

class AdministratorByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  id = request.params.id;
    const administratorByIdUseCase = container.resolve(AdministratorByIdUseCase);
    const administrator = await administratorByIdUseCase.execute({ id });

    return response.status(201).json(administrator);
  }
}

export { AdministratorByIdController }