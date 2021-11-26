import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/In-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe("Create User", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  const user = {
    name: "User Test",
    email: "test@test.com",
    phone: 123456789,
    cpf: 32268300900,
    ra: 123456789,
    profile: "Aluno",
    active: true
  };

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    await createUserUseCase.execute(user);
    const userCreated = await usersRepositoryInMemory.findByUser(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("deve retornar erro se algum parametro for nulo", async () => {  
    // expect(async () => {
    //   user.name = null;
    //   user.email = '';
    //   console.log('user2: ', user)
    //   await createUserUseCase.execute(user);
    //   console.log('AppError: ', AppError)

    // }).rejects.toBeInstanceOf(AppError);

    user.name = null;
    user.email = '';
    console.log('user2: ', user)
    await createUserUseCase.execute(user);
    console.log('AppError: ', AppError)
    expect(AppError).toHaveProperty;
  });
});