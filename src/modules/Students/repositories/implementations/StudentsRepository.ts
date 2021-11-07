import { getRepository, Repository } from "typeorm";
import { Student } from "../../entities/Student";
import { IStudentsRepository, ICreateStudentDTO } from "../IStudentsRepositories";

class StudentsRepository implements IStudentsRepository{
  
  private repository: Repository<Student>;

  constructor() { this.repository = getRepository(Student); }

  async create({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void> {
    const student = this.repository.create({ name, email, ra, cpf });
    await this.repository.save(student);
  }

  async list(): Promise<Student[]> {
    const students = await this.repository.find();
    return students;
  }

  async findById(id: string): Promise<Student> {
    const student = await this.repository.findOne({ id });
    return student;
  }
}

export { StudentsRepository }