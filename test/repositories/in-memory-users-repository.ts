import { UsersRepository } from "src/domain/tasks/application/repository/users-repository";
import { User } from "src/domain/tasks/enterprise/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);
    this.items[itemIndex] = user;
  }

  async delete(userId: string) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === userId
    );

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.items.push(user);
  }
}
