import { Administrator } from "../model/Administrator";

interface ICreateAdministratorDTO {
  name: string;
  email: string;
  cpf: string
}

interface IAdministratorsRepository {
  create({ name, email, cpf }: ICreateAdministratorDTO): Administrator;
  list(): Administrator[];
  findById(id:string): Administrator;
}

export { IAdministratorsRepository, ICreateAdministratorDTO }