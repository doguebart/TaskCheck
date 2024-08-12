import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { User, UserProps } from "@/domain/tasks/enterprise/user";
import { faker } from "@faker-js/faker";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return user;
}
