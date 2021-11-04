import { Request, Response } from "express";
import { StudentByIdUseCase } from "./StudentByIdUseCase";


class StudentByIdController {
  constructor(private studentByIdUseCase: StudentByIdUseCase) {}

  handle(request: Request, response: Response, id): Response {
    const students = this.studentByIdUseCase.execute(id);
  
    return response.status(201).json(students);
  }
}

export { StudentByIdController }