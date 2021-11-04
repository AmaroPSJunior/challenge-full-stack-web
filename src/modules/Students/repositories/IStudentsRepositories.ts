import { Student } from "../model/Student";

interface ICreateStudentDTO {
  name: string;
  email: string;
  ra: number,
  cpf: string
}

interface IStudentsRepository {
  create({ name, email, ra, cpf }: ICreateStudentDTO): Student;
  list(): Student[];
  findById(id:string): Student;
}

export { IStudentsRepository, ICreateStudentDTO }