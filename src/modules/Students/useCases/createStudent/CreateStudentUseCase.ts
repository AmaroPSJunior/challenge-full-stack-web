import { Student } from "../../model/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepositories";

interface IRequest {
  name: string;
  email: string;
  ra: number,
  cpf: string
}

class CreateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  execute({name, email, ra, cpf }: IRequest): Student {
    return this.studentsRepository.create({ name, email, ra, cpf });
  }
}

export { CreateStudentUseCase }