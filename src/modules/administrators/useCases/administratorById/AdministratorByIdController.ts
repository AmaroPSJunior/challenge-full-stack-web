import { Request, Response } from "express";
import { AdministratorByIdUseCase } from "./AdministratorByIdUseCase";


class AdministratorByIdController {
  constructor(private administratorByIdUseCase: AdministratorByIdUseCase) {}

  handle(request: Request, response: Response): Response {
    const id = request.params.id;
    const administrator = this.administratorByIdUseCase.execute(id);

    return response.status(201).json(administrator);
  }
}

export { AdministratorByIdController }