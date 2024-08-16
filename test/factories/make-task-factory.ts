import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Task, TaskProps } from "@/domain/tasks/enterprise/tasks";
import { faker } from "@faker-js/faker";

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityId
) {
  const task = Task.create(
    {
      userId: new UniqueEntityId(),
      title: faker.lorem.sentence(1),
      description: faker.lorem.paragraph(4),
      ...override,
    },
    id
  );

  return task;
}
