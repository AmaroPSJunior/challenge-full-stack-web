import { AdministratorsRepository } from "../../repositories/implementations/AdministratorsRepository";
import { ListAdministratorController } from "./ListAdministratorController";
import { ListAdministratorUseCase } from "./ListAdministratorUseCase";

const administratorsRepository = AdministratorsRepository.getInstance();
const listAdministratorUseCase = new ListAdministratorUseCase(administratorsRepository);
const listAdministratorController = new ListAdministratorController(listAdministratorUseCase);

export { listAdministratorController }