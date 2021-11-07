import { Request, Response } from "express";
import { StudentByIdUseCase } from "./StudentByIdUseCase";
import { container } from "tsyringe";

class StudentByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const studentByIdUseCase = container.resolve(StudentByIdUseCase);
    const students = await studentByIdUseCase.execute({ id });
  
    return response.status(201).json(students);
  }
}

export { StudentByIdController }