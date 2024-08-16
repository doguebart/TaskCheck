import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Task } from "../../enterprise/tasks";
import { TasksRepository } from "../repository/tasks-repository";

export interface CompleteTaskUseCaseRequest {
  userId: string;
  taskId: string;
}

type CompleteTaskUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  { task: Task }
>;

@Injectable()
export class CompleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    taskId,
  }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    if (task.userId.toString() !== userId) {
      return left(new NotAllowedError());
    }

    task.completedAt = new Date();

    await this.tasksRepository.save(task);

    return right({
      task,
    });
  }
}
