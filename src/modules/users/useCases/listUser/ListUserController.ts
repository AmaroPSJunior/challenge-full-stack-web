import { Request, Response } from "express";
import { ListUserUseCase } from "./ListUserUseCase";
import { container } from "tsyringe";

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const pagination = request.body;
    const listUserUseCase = container.resolve(ListUserUseCase);
    const users = await listUserUseCase.execute(pagination);
    
    return response.status(200).json(users);
  }
}

export { ListUserController }