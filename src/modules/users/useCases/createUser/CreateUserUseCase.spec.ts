import { UsersRepositoryInMemory } from "../../repositories/In-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe("Create User", () => {
  let createUser: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to create a new user", () => {
    const createUser = new CreateUserUseCase
  })
})