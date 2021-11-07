import { Request, Response } from "express";
import { ListStudentUseCase } from "./ListStudentUseCase";
import { container } from "tsyringe";

class ListStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStudentUseCase = container.resolve(ListStudentUseCase);
    const students = await listStudentUseCase.execute();
    
    return response.status(200).json(students);
  }
}

export { ListStudentController }