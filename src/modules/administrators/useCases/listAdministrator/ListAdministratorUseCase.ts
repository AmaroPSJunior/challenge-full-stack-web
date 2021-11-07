import { inject, injectable } from "tsyringe";
import { Administrator } from "../../entities/Administrator";
import { IAdministratorsRepository } from "../../repositories/IAdministratorsRepositories";


@injectable() 
class ListAdministratorUseCase {
  constructor(
    @inject("AdministratorsRepository")
    private administratorsRepository: IAdministratorsRepository
  ) {}

  async execute(): Promise<Administrator[]> {
    const administrator = await this.administratorsRepository.list();
  
    return administrator;
  }
}

export { ListAdministratorUseCase }