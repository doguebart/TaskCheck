import { Task } from "../../enterprise/tasks";

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
}
