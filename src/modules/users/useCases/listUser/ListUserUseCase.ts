import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { ICreateUserDTO, IResponseDTO, IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  id?: string;
  limit: string;
  next: string;
}

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({id, limit, next }: IRequest): Promise<IResponseDTO> {
    const pagination = {
      id,
      limit: parseInt(limit),
      next: next === 'true',
    }

    if (!pagination.limit || pagination.limit < 1){
      pagination.limit = 10;
      pagination.next = true;
    }
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
    console.log('🟢 pagination', pagination)
    const users = await this.usersRepository.list(pagination);
    // return users.length > 0 ? users : firstUser();
    return users;
  }
}

export { ListUserUseCase }