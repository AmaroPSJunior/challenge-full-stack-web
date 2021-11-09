import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  phone: number;
  cpf: number;
  profile: string;
  active: boolean;
}

interface IUsersRepository {
  create({ name, email, phone, cpf, profile, active }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findById(id:string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO }