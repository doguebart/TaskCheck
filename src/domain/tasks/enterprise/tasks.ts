import { Entity } from "@/core/entity/entity";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";

export interface TaskProps {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Task extends Entity<TaskProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get isCompleted() {
    return this.props.isCompleted;
  }

  set isCompleted(isCompleted: boolean) {
    this.props.isCompleted = isCompleted;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: TaskProps, id?: UniqueEntityId) {
    const task = new Task(
      {
        ...props,
        isCompleted: props.isCompleted ?? false,
      },
      id
    );

    return task;
  }
}
