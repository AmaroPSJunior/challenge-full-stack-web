import { IStudentsRepository } from "../../repositories/IStudentsRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  ra: number;
  cpf: string;
}

@injectable()
class CreateStudentUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  async execute({name, email, ra, cpf }: IRequest): Promise<void> {
    await this.studentsRepository.create({ name, email, ra, cpf });
  }
}

export { CreateStudentUseCase }