import { Administrator } from "../../model/Administrator";
import { IAdministratorsRepository, ICreateAdministratorDTO } from "../IAdministratorsRepositories";

class PostgrasAdministratorRepository implements IAdministratorsRepository {
  create({ name, email, cpf }: ICreateAdministratorDTO): Administrator {
    console.log('create');
    throw new Error("Method not implemented.");
  }
  list(): Administrator[] {
    console.log('list');
    throw new Error("Method not implemented."); 
  }
  findById(id: string): Administrator {
    console.log('findById');
    throw new Error("Method not implemented.");
  }

}

export { PostgrasAdministratorRepository }