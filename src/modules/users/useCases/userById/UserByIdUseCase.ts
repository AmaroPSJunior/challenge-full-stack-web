import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  id: string;
}
@injectable()
class UserByIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById( id );
  
    if (!user) throw new AppError('user not found!', 404);

    return user;
  }
}

export { UserByIdUseCase }