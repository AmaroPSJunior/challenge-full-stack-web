import { UsersRepositoryInMemory } from "../../repositories/In-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe("Create User", () => {
  let createUser: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to create a new user", async () => {
    const user = {
      id: "b67705e4-9d01-4e6b-9fb1-ec5b758726eb",
      name: "Administrador",
      email: "admin@admin.com",
      phone: 123456789,
      cpf: 32268300900,
      ra: 123456789,
      profile: "Administrador",
      active: true
    };

    await createUserUseCase.execute({
      id: "b67705e4-9d01-4e6b-9fb1-ec5b758726eb",
      name: "Administrador",
      email: "admin@admin.com",
      phone: 123456789,
      cpf: 32268300900,
      ra: 123456789,
      profile: "Administrador",
      active: true
    });

    const UserCreated = await UsersRepositoryInMemory.findByUser({  
      id: "b67705e4-9d01-4e6b-9fb1-ec5b758726eb",
      name: "Administrador",
      email: "admin@admin.com",
      phone: 123456789,
      cpf: 32268300900,
      ra: 123456789,
      profile: "Administrador",
      active: true
    });

    console.log(userCreated)
  })
})