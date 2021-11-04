import { Student } from "../../model/Student";
import { ICreateStudentDTO, IStudentsRepository } from "../IStudentsRepositories";

class StudentsRepository implements IStudentsRepository{
  
  private students: Student[];

  private static INSTANCE: StudentsRepository;

  private constructor() { this.students = []; }

  public static getInstance(): StudentsRepository {
    if (!StudentsRepository.INSTANCE) {
      StudentsRepository.INSTANCE = new StudentsRepository();
    }
    return StudentsRepository.INSTANCE;
  };

  create({ name, email, ra, cpf }: ICreateStudentDTO): Student {
    const student = new Student();
  
    Object.assign(student, {
      name,
      email,
      ra,
      cpf
    });

    this.students.push(student);

    return student;
  }

  list(): Student[] {
    return this.students;
  }

  findById(idStudent: string): Student {
    return this.students.find(s => s.id === idStudent);
  }
}

export { StudentsRepository }