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

interface IPaginationDTO {
  id?: string;
  limit: number;
  next: boolean;
}

interface IResponseDTO {
  users: User[];
  pagination?: {
    total?: number;
    page?: number;
  }
}

interface IUsersRepository {
  create({ id, name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<void>;
  list(pagination: IPaginationDTO): Promise<IResponseDTO>;
  findByUser({ name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<User>;
  findById(id:string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO, IPaginationDTO, IResponseDTO }