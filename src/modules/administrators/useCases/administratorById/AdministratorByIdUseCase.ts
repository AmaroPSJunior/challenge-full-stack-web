import { Administrator } from "../../model/Administrator";
import { AdministratorsRepository } from "../../repositories/implementations/AdministratorsRepository";


class AdministratorByIdUseCase {
  constructor(private administratorsRepository: AdministratorsRepository) {}

  execute(id: string): Administrator {
    const administrator = this.administratorsRepository.findById(id);
    return administrator;
  }
}

export { AdministratorByIdUseCase }