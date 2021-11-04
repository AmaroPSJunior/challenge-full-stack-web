import { Request, Response } from "express";
import { ListAdministratorUseCase } from "./ListAdministratorUseCase";


class ListAdministratorController {
  constructor(private listAdministratorUseCase: ListAdministratorUseCase) {}

  handle(request: Request, response: Response): Response {
    const Administrators = this.listAdministratorUseCase.execute();
  
    return response.status(201).json(Administrators);
  }
}

export { ListAdministratorController }