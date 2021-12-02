import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/In-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe("Create User", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let user = {
    id: new User().id,
    name: "new test user",
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
    const userCreated = await usersRepositoryInMemory.findById(user.id );
    expect(userCreated.id).toEqual(user.id);
  });

  it("should be able to change a user", async () => {
    await createUserUseCase.execute(user);
    user.name = 'changed test user';
    await createUserUseCase.execute(user);
    const userChanged = await usersRepositoryInMemory.findById(user.id);
    expect(userChanged.name).toEqual("changed test user");
  });

  it("should be able to delete a user", async () => {
    await createUserUseCase.execute(user);
    user.active = false;
    await createUserUseCase.execute(user);
    const userDeleted = await usersRepositoryInMemory.findById(user.id);
    expect(userDeleted.active).toEqual(false);
  });
});