import { Student } from "../../model/Student";
import { StudentsRepository } from "../../repositories/implementations/StudentsRepository";


class ListStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  execute(): Student[] {
    const students = this.studentsRepository.list();
  
    return students;
  }
}

export { ListStudentUseCase }