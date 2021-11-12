import { User } from "../entities/User";

interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  phone: number;
  cpf: number;
  ra: number;
  profile: string;
  active: boolean;
}

interface IUsersRepository {
  create({ id, name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findById(id:string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO }