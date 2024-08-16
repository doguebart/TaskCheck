import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Task } from "../../enterprise/tasks";

export interface GetTaskUseCaseRequest {
  taskId: string;
}

type GetTaskUseCaseResponse = Either<ResourceNotFoundError, { task: Task }>;

@Injectable()
export class GetTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    return right({
      task,
    });
  }
}
