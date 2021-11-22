import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepositories";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const firstUser = async (): Promise<User[]> => {  
      await this.usersRepository.create({
        id: "b67705e4-9d01-4e6b-9fb1-ec5b758726eb",
        name: "Administrador",
        email: "admin@admin.com",
        phone: 123456789,
        cpf: 32268300900,
        ra: 123456789,
        profile: "Administrador",
        active: true
      });

      return await this.usersRepository.list();
    }

    const users = await this.usersRepository.list();
    return users.length > 0 ? users : firstUser();
  }
}

export { ListUserUseCase }