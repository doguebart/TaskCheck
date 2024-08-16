import { InMemoryTasksRepository } from "test/repositories/in-memory-tasks-repository";
import { makeTask } from "test/factories/make-task-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { DeleteTaskUseCase } from "./delete-task";
import { makeUser } from "test/factories/make-user-factory";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteTaskUseCase;

describe("Delete Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteTaskUseCase(inMemoryTasksRepository);
  });

  it("should be able to delete a task by id", async () => {
    const user = makeUser({}, new UniqueEntityId("user-01"));
    inMemoryUsersRepository.items.push(user);

    const task1 = makeTask(
      {
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("task-01")
    );
    inMemoryTasksRepository.items.push(task1);

    expect(inMemoryTasksRepository.items).toHaveLength(1);

    const result = await sut.execute({
      userId: "user-01",
      taskId: "task-01",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryTasksRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user task", async () => {
    const user1 = makeUser({}, new UniqueEntityId("user-01"));
    const user2 = makeUser({}, new UniqueEntityId("user-02"));

    inMemoryUsersRepository.items.push(user1, user2);

    expect(inMemoryUsersRepository.items).toHaveLength(2);

    const task1 = makeTask(
      { userId: new UniqueEntityId("user-01") },
      new UniqueEntityId("task-01")
    );

    inMemoryTasksRepository.items.push(task1);

    expect(inMemoryTasksRepository.items).toHaveLength(1);

    const result = await sut.execute({
      taskId: "task-01",
      userId: "user-02",
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });
});
