import { UsersRepository } from "src/domain/tasks/application/repository/users-repository";
import { User } from "src/domain/tasks/enterprise/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }
}
