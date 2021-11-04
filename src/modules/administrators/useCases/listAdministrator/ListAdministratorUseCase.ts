import { Administrator } from "../../model/Administrator";
import { AdministratorsRepository } from "../../repositories/implementations/AdministratorsRepository";


class ListAdministratorUseCase {
  constructor(private administratorsRepository: AdministratorsRepository) {}

  execute(): Administrator[] {
    const Administrators = this.administratorsRepository.list();
  
    return Administrators;
  }
}

export { ListAdministratorUseCase }