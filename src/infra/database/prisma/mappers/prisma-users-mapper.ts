import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { User } from "@/domain/tasks/enterprise/user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaUsersMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id)
    );
  }
}
