import { AdministratorsRepository } from "../../repositories/implementations/AdministratorsRepository";
import { AdministratorByIdController } from "./AdministratorByIdController";
import { AdministratorByIdUseCase } from "./AdministratorByIdUseCase";

const administratorsRepository = AdministratorsRepository.getInstance();
const administratorByIdUseCase = new AdministratorByIdUseCase(administratorsRepository);
const administratorByIdController = new AdministratorByIdController(administratorByIdUseCase);

export { administratorByIdController }