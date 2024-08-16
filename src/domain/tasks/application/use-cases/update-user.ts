import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

export interface UpdateUserRequest {
  name: string;
  userId: string;
}

type UpdateUserResponse = Either<ResourceNotFoundError, {}>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    userId,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (name.length < 3) {
      throw new Error("Name should have at least 3 characters");
    }

    user.name = name;

    await this.usersRepository.save(user);

    return right({});
  }
}
