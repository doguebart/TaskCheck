import { Injectable } from "@nestjs/common";
import { TasksRepository } from "../repository/tasks-repository";
import { Task } from "../../enterprise/tasks";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Either, right } from "@/core/either";

export interface CreateTaskRequest {
  userId: string;
  title: string;
  description: string;
}

type CreateTaskResponse = Either<null, { task: Task }>;

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    title,
    description,
  }: CreateTaskRequest): Promise<CreateTaskResponse> {
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
