import { TasksRepository } from "@/domain/tasks/application/repository/tasks-repository";
import { Task } from "@/domain/tasks/enterprise/tasks";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async findById(taskId: string): Promise<Task | void> {
    const task = this.items.find((item) => item.id.toString() === taskId);

    if (!task) {
      return;
    }

    return task;
  }

  async fetchUserTasks(userId: string): Promise<Task[]> {
    const tasks = this.items.filter(
      (item) => item.userId.toString() === userId
    );

    return tasks;
  }

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }
}
