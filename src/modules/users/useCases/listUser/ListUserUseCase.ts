import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { ICreateUserDTO, IResponseDTO, IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  id?: string;
  limit: number;
  next: boolean;
}

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(pagination: IRequest): Promise<IResponseDTO> {
    // const firstUser = async (): Promise<User[]> => {  
    //   await this.usersRepository.create({
    //     id: "b67705e4-9d01-4e6b-9fb1-ec5b758726eb",
    //     name: "Administrador",
    //     email: "admin@admin.com",
    //     phone: 123456789,
    //     cpf: 32268300900,
    //     ra: 123456789,
    //     profile: "Administrador",
    //     active: true
    //   });

    //   return await this.usersRepository.list(pagination);
    // }

    const users = await this.usersRepository.list(pagination);
    // return users.length > 0 ? users : firstUser();
    return users;
  }
}

export { ListUserUseCase }