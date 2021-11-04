import { Request, Response } from "express";
import { ListStudentUseCase } from "./ListStudentUseCase";


class ListStudentController {
  constructor(private listStudentUseCase: ListStudentUseCase) {}

  handle(request: Request, response: Response): Response {
    const students = this.listStudentUseCase.execute();
  
    return response.status(201).json(students);
  }
}

export { ListStudentController }