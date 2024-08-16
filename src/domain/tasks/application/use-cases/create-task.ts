import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Task } from "../../enterprise/tasks";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Either, right } from "@/core/either";

export interface CreateTaskUseCaseRequest {
  userId: string;
  title: string;
  description: string;
}

type CreateTaskUseCaseResponse = Either<null, { task: Task }>;

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    title,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({
      userId: new UniqueEntityId(userId),
      title,
      description,
    });

    await this.tasksRepository.create(task);

    return right({
      task,
    });
  }
}
