import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepositories";


class UsersRepositoryInMemory implements IUsersRepository {

  users: Users[] = [];

  async create1({ id, name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(User, {
      id, name, email, phone, cpf, ra, profile, active
    })

    this.users.push(user);
  }
  
  async list(): Promise<User[]> {
    const users = await this.users;
    return users;
  }

  async findByUser({ name, email, phone, cpf, ra, profile, active }: ICreateUserDTO): Promise<User> {
    const user = await this.users.find(u => {
      u.name === name &&
      u.email === email &&
      u.phone === phone&&
      u.cpf === cpf&&
      u.ra === ra &&
      u.profile === profile &&
      u.active === active
      return user;
    });
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.users.find(u => u.id === id);
    return user;
  }
}

export { UsersRepositoryInMemory };