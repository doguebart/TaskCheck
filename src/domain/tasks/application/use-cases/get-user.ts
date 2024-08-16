import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { User } from "../../enterprise/user";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

export interface GetUserUseCaseRequest {
  id: string;
}

type GetUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>;

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({
      user,
    });
  }
}
