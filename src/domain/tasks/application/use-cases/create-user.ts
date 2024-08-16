import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { hash } from "bcryptjs";
import { User } from "../../enterprise/user";
import { UserAlreadyExistsError } from "@/core/errors/user-already-exists-error";
import { Either, left, right } from "@/core/either";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError, { user: User }>;

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError());
    }

    const password_hash = await hash(password, 8);

    const user = User.create({
      name,
      email,
      password: password_hash,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
