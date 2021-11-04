import { Request, Response } from "express";
import { CreateStudentUseCase } from "./CreateStudentUseCase";

class CreateStudentController {
  constructor(private createStudentUseCase: CreateStudentUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email, ra, cpf } = request.body;
  
    const newStudent = this.createStudentUseCase.execute({ name, email, ra, cpf });
  
    return response.status(201).json(newStudent);
  }
}

export { CreateStudentController }