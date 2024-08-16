import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";
import { User } from "../../enterprise/user";

export interface DeleteUserUseCaseRequest {
  userId: string;
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.usersRepository.delete(userId);

    return right({
      user,
    });
  }
}
