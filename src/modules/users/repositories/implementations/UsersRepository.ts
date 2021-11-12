import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepositories";

class UsersRepository implements IUsersRepository{
  
  private repository: Repository<User>;

  constructor() { this.repository = getRepository(User); }

  async create({ id, name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ id, name, email, phone, cpf, ra, profile, active });
    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
}

export { UsersRepository }