import { Administrator } from "../../entities/Administrator";
import { inject, injectable } from "tsyringe";
import { IAdministratorsRepository } from "../../repositories/IAdministratorsRepositories";

interface IRequest {
  id: string;
}

@injectable()
class AdministratorByIdUseCase {
  constructor(
    @inject("AdministratorsRepository")
    private administratorsRepository: IAdministratorsRepository
  ) {}

  execute({ id }: IRequest): Promise<Administrator> {
    const administrator = this.administratorsRepository.findById(id);
    return administrator;
  }
}

export { AdministratorByIdUseCase }