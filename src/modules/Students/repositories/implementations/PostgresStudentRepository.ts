import { Student } from "../../model/Student";
import { ICreateStudentDTO, IStudentsRepository } from "../IStudentsRepositories";

class PostgresStudentRepository implements IStudentsRepository {
  create({ name, email, ra, cpf }: ICreateStudentDTO): Student {
    console.log('create');
    throw new Error("Method not implemented.");
  }
  list(): Student[] {
    console.log('list');
    throw new Error("Method not implemented."); 
  }
  findById(id: string): Student {
    console.log('findById');
    throw new Error("Method not implemented.");
  }

}

export { PostgresStudentRepository }