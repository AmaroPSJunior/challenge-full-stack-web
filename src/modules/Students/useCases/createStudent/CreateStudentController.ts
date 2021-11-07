import { Request, Response } from "express";
import { CreateStudentUseCase } from "./CreateStudentUseCase";
import { container } from "tsyringe";

class CreateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, ra, cpf } = request.body;
    const createStudentUseCase = container.resolve(CreateStudentUseCase);
    await createStudentUseCase.execute({ name, email, ra, cpf });
  
    return response.status(201).send();
  }
}

export { CreateStudentController }