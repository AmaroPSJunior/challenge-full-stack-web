import { CreateStudentController } from "../../../Students/useCases/createStudent/CreateStudentController";
import { AdministratorsRepository } from "../../repositories/implementations/AdministratorsRepository";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";

const administratorsRepository = AdministratorsRepository.getInstance();
const createAdministratorUseCase = new CreateAdministratorUseCase(administratorsRepository);
const createAdministratorController = new CreateStudentController(createAdministratorUseCase);

export { createAdministratorController };