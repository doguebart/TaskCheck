import { Task } from "../../enterprise/tasks";

export abstract class TasksRepository {
  abstract save(task: Task): Promise<void>;
  abstract delete(task: Task): Promise<void>;
  abstract findById(taskId: string): Promise<Task | void>;
  abstract fetchUserTasks(userId: string): Promise<Task[]>;
  abstract create(task: Task): Promise<void>;
}
