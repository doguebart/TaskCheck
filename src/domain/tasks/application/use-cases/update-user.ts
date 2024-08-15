import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";

export interface UpdateUserRequest {
  name: string;
  userId: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, userId }: UpdateUserRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (name.length < 3) {
      throw new Error("Name should have at least 3 characters");
    }

    user.name = name;

    await this.usersRepository.save(user);
  }
}
