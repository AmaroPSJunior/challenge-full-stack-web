import { Student } from "../entities/Student";

interface ICreateStudentDTO {
  name: string;
  email: string;
  ra: number;
  cpf: string;
}

interface IStudentsRepository {
  create({ name, email, ra, cpf }: ICreateStudentDTO): Promise<void>;
  list(): Promise<Student[]>;
  findById(id:string): Promise<Student>;
}

export { IStudentsRepository, ICreateStudentDTO }