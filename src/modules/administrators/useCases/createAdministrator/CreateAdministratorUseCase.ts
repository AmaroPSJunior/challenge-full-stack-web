import { IAdministratorsRepository } from "../../repositories/IAdministratorsRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  cpf: string;
}

@injectable()
class CreateAdministratorUseCase {
  constructor(
    @inject("AdministratorsRepository")
    private administratorsRepository: IAdministratorsRepository
  ) {}

  async execute({name, email, cpf }: IRequest): Promise<void> { 
    await this.administratorsRepository.create({ name, email, cpf });
  }
}

export { CreateAdministratorUseCase }