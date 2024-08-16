import { TasksRepository } from "@/domain/tasks/application/repository/tasks-repository";
import { Task } from "@/domain/tasks/enterprise/tasks";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }
}
