import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";

export interface DeleteUserRequest {
  userId: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    await this.usersRepository.delete(userId);
  }
}
