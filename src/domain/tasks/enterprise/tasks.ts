import { Entity } from "@/core/entity/entity";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface TaskProps {
  userId: UniqueEntityId;
  title: string;
  description: string;
  createdAt: Date;
  completedAt?: Date | null;
}

export class Task extends Entity<TaskProps> {
  get userId() {
    return this.props.userId;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  set completedAt(completedAt: Date | null | undefined) {
    this.props.completedAt = completedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<TaskProps, "createdAt" | "completedAt">,
    id?: UniqueEntityId
  ) {
    const task = new Task(
      {
        ...props,
        completedAt: props.completedAt ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return task;
  }
}
