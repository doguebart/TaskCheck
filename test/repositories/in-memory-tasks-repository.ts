import { TasksRepository } from "@/domain/tasks/application/repository/tasks-repository";
import { Task } from "@/domain/tasks/enterprise/tasks";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async save(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id);

    this.items[itemIndex] = task;
  }

  async delete(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id);

    this.items.splice(itemIndex, 1);
  }

  async findById(taskId: string) {
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

  async create(task: Task) {
    this.items.push(task);
  }
}
