import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepositories";


class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];

  
  async list(): Promise<User[]> {
    const users = await this.users;
    return users;
  }

  async findByUser({ name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<User> {
    const user = await this.users.find(u => u.name === name);

    return user;
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.users.find(u => u.id === id);
    return user;
  }

  async create({ id, name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      id, name, email, phone, cpf, ra, profile, active
    })

    this.users.push(user);
  }
}

export { UsersRepositoryInMemory };