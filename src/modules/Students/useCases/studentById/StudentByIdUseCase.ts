import { inject, injectable } from "tsyringe";
import { Student } from "../../entities/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepositories";

interface IRequest {
  id: string;
}
@injectable()
class StudentByIdUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById( id );
  
    return student;
  }
}

export { StudentByIdUseCase }