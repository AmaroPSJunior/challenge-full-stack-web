import { Administrator } from "../../model/Administrator";
import { IAdministratorsRepository } from "../../repositories/IAdministratorsRepositories";

interface IRequest {
  name: string;
  email: string;
  cpf: string
}

class CreateAdministratorUseCase {
  constructor(private AdministratorsRepository: IAdministratorsRepository) {}

  execute({name, email, cpf }: IRequest): Administrator {
    return this.AdministratorsRepository.create({ name, email, cpf });
  }
}

export { CreateAdministratorUseCase }