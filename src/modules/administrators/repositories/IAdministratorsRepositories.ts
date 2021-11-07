import { Administrator } from "../entities/Administrator";

interface ICreateAdministratorDTO {
  name: string;
  email: string;
  cpf: string;
}

interface IAdministratorsRepository {
  create({ name, email, cpf }: ICreateAdministratorDTO): Promise<void>;
  list(): Promise<Administrator[]>;
  findById(id:string): Promise<Administrator>;
}

export { IAdministratorsRepository, ICreateAdministratorDTO }