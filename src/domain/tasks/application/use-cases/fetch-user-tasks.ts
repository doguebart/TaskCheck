import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Either, right } from "@/core/either";
import { Task } from "../../enterprise/tasks";

export interface FetchUserTasksUseCaseRequest {
  userId: string;
}

type FetchUserTasksUseCaseResponse = Either<null, { tasks: Task[] }>;

@Injectable()
export class FetchUserTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
  }: FetchUserTasksUseCaseRequest): Promise<FetchUserTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchUserTasks(userId);

    return right({
      tasks,
    });
  }
}
