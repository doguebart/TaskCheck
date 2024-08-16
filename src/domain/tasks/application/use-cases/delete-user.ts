import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

export interface DeleteUserRequest {
  userId: string;
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, {}>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.usersRepository.delete(userId);

    return right({});
  }
}
