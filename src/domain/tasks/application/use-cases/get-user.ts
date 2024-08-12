import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repository/users-repository";
import { User } from "../../enterprise/user";

export interface GetUserRequest {
  id: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserRequest): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
