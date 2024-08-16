import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";
import { User } from "../../enterprise/user";

export interface UpdateUserUseCaseRequest {
  name: string;
  userId: string;
}

type UpdateUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    userId,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.name = name;

    await this.usersRepository.save(user);

    return right({
      user,
    });
  }
}
