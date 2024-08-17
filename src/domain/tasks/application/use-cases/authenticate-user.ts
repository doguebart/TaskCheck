import { Either, left, right } from "@/core/either";
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials-error";
import { Injectable } from "@nestjs/common";
import { User } from "../../enterprise/user";
import { UsersRepository } from "../repository/users-repository";
import { compare } from "bcryptjs";

export interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  InvalidCredentialsError,
  { user: User }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return left(new InvalidCredentialsError());
    }

    return right({
      user,
    });
  }
}
