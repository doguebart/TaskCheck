import { User } from "../../enterprise/user";

export abstract class UsersRepository {
  abstract delete(userId: string): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
}
