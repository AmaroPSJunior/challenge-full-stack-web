import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepositories";

container.registerSingleton<IUsersRepository>(
  "UsersRepository", 
  UsersRepository
);