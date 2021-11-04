import { Student } from "../../model/Student";
import { StudentsRepository } from "../../repositories/implementations/StudentsRepository";


class StudentByIdUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  execute(id): Student {
    const student = this.studentsRepository.findById(id);
  
    return student;
  }
}

export { StudentByIdUseCase }