import { getRepository, LessThan, LessThanOrEqual, MinKey, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUserDTO, IPaginationDTO, IResponseDTO, IUsersRepository } from "../IUsersRepositories";

class UsersRepository implements IUsersRepository{
  
  private repository: Repository<User>;
  private page: number = 1;

  constructor() { this.repository = getRepository(User); }

  async create(newUser: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(newUser);
    await this.repository.save(user);
  }

  async list(pagination: IPaginationDTO): Promise<IResponseDTO> {
    const id = pagination.id;
    const user = id ? await this.repository.findOne({ id }) : null;
    const query = this.repository.createQueryBuilder("users");
    const { min } = !user ? await query.select("MIN(users.created_at)").getRawOne() : null;
    const total = await this.repository.count({ cache: true });
    const users = await this.repository.find({
      select: [
        "id",
        "name",
        "email",
        "ra",
        "cpf",
        "phone",
        "profile",
        "created_at",
        "active"
      ],
      where: user ? { 
        created_at: pagination.next 
        ? (this.page === 1 ? MoreThanOrEqual(user.created_at) 
        : MoreThan(user.created_at)) 
        : LessThanOrEqual(user.created_at) 
      } 
      : { created_at: MoreThanOrEqual(min)},
      order: { created_at: "DESC" },
      take: pagination.limit,
      cache: true,
    });

    pagination.next ? this.page++ : this.page-- ;
    const response = {
      users,
      pagination: {
        total,
        page: this.page,
      } 
    }
    
    return response;
  }

  async findByUser({ email, cpf, ra }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.findOne({ email, cpf, ra });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
}

export { UsersRepository }