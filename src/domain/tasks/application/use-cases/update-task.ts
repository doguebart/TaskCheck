import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { Task } from "../../enterprise/tasks";

export interface UpdateTaskUseCaseRequest {
  userId: string;
  taskId: string;
  title: string;
  description: string;
}

type UpdateTaskUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { task: Task }
>;

@Injectable()
export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    userId,
    title,
    description,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    if (task.userId.toString() !== userId) {
      return left(new NotAllowedError());
    }

    task.title = title;
    task.description = description;

    await this.tasksRepository.save(task);

    return right({
      task,
    });
  }
}
