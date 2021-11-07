import { inject, injectable } from "tsyringe";
import { Student } from "../../entities/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepositories";

@injectable()
class ListStudentUseCase {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository
  ) {}

  async execute(): Promise<Student[]> {
    const students = await this.studentsRepository.list();
  
    return students;
  }
}

export { ListStudentUseCase }