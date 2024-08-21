import { UsersRepository } from "@/domain/tasks/application/repository/users-repository";
import { User } from "@/domain/tasks/enterprise/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUsersMapper } from "../mappers/prisma-users-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async delete(userId: string) {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUsersMapper.toDomain(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUsersMapper.toDomain(user);
  }

  async save(user: User) {
    const data = PrismaUsersMapper.toPrisma(user);

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async create(user: User) {
    const data = PrismaUsersMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }
}
