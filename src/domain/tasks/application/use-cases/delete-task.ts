import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { Task } from "../../enterprise/tasks";

export interface DeleteTaskUseCaseRequest {
  userId: string;
  taskId: string;
}

type DeleteTaskUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

@Injectable()
export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    if (task.userId.toString() !== userId) {
      return left(new NotAllowedError());
    }

    await this.tasksRepository.delete(task);

    return right({});
  }
}
