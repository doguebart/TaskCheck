import { Task } from "../../enterprise/tasks";

export abstract class TasksRepository {
  abstract findById(taskId: string): Promise<Task | void>;
  abstract fetchUserTasks(userId: string): Promise<Task[]>;
  abstract create(task: Task): Promise<void>;
}
