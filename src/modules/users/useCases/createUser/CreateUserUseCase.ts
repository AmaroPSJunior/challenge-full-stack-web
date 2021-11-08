import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  name: string;
  email: string;
  phone: number;
  cpf: string;
  profile: string;
  active: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, phone, cpf, profile, active }: IRequest): Promise<void> {
    await this.usersRepository.create({ name, email, phone, cpf, profile, active });
  }
}

export { CreateUserUseCase }