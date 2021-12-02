import { User } from "../../entities/User";
import { ICreateUserDTO, IPaginationDTO, IResponseDTO, IUsersRepository } from "../IUsersRepositories";


class UsersRepositoryInMemory implements IUsersRepository {

  users: User[] = [];
  total: number = 0;
  page: number = 1;

  
  async list(pagination: IPaginationDTO): Promise<IResponseDTO> {
    const users = await this.users;
    this.total = this.users.length;

    pagination.next ? this.page++ : this.page-- ;
    const response = {
      users,
      pagination: {
        total: this.total,
        page: this.page,
      } 
    }
    
    return response;
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
    
    const u = await this.findById(id)
    if(u) {
      this.users.forEach(u => {
        if(u.id === id) {
          u.id = id;
          u.name = name;
          u.email = email;
          u.phone = phone;
          u.cpf = cpf;
          u.ra = ra;
          u.active = active;
        }
      });
      return;
    }
    this.users.push(user);
  }
}

export { UsersRepositoryInMemory };