import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { hash } from "bcryptjs";
import { User } from "../../enterprise/user";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserRequest): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail is already in use.");
    }

    const password_hash = await hash(password, 8);

    const user = User.create({
      name,
      email,
      password: password_hash,
    });

    await this.usersRepository.create(user);
  }
}
