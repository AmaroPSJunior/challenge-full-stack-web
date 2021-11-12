import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  id?: string;
  name: string;
  email: string;
  phone: number;
  cpf: number;
  ra: number;
  profile: string;
  active: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({id, name, email, phone, cpf, ra, profile, active }: IRequest): Promise<void> {
    await this.usersRepository.create({ id, name, email, phone, cpf, ra, profile, active });
  }
}

export { CreateUserUseCase }