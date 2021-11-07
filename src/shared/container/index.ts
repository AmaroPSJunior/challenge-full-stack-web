import { container } from "tsyringe";
import { IAdministratorsRepository } from "../../modules/administrators/repositories/IAdministratorsRepositories";
import { AdministratorsRepository } from "../../modules/administrators/repositories/implementations/AdministratorsRepository";
import { StudentsRepository } from "../../modules/students/repositories/implementations/StudentsRepository";
import { IStudentsRepository } from "../../modules/students/repositories/IStudentsRepositories";

container.registerSingleton<IStudentsRepository>(
  "StudentsRepository", 
  StudentsRepository
);

container.registerSingleton<IAdministratorsRepository>(
  "AdministratorsRepository", 
  AdministratorsRepository
);
