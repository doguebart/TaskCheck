import { InMemoryTasksRepository } from "test/repositories/in-memory-tasks-repository";
import { makeTask } from "test/factories/make-task-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { UpdateTaskUseCase } from "./update-task";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user-factory";

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: UpdateTaskUseCase;

describe("Update Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UpdateTaskUseCase(inMemoryTasksRepository);
  });

  it("should be able to update a task", async () => {
    const user = makeUser({}, new UniqueEntityId("user-01"));
    inMemoryUsersRepository.items.push(user);

    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const task = makeTask(
      {
        title: "New Task 01",
        description: "New Task Description",
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("task-01")
    );
    await inMemoryTasksRepository.create(task);

    expect(inMemoryTasksRepository.items).toHaveLength(1);

    const result = await sut.execute({
      userId: "user-01",
      taskId: "task-01",
      title: "New Task 01 UPDATED",
      description: "New Task Description UPDATED",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryTasksRepository.items[0]).toEqual(
      expect.objectContaining({
        title: "New Task 01 UPDATED",
        description: "New Task Description UPDATED",
      })
    );
  });

  it("should not be able to update a non existing task", async () => {
    const task = makeTask(
      {
        title: "New Task 01",
        description: "New Task Description",
        userId: new UniqueEntityId("user-01"),
      },
      new UniqueEntityId("task-01")
    );
    await inMemoryTasksRepository.create(task);

    expect(inMemoryTasksRepository.items).toHaveLength(1);

    const result = await sut.execute({
      userId: "user-01",
      taskId: "task-02",
      title: "New Task 01 UPDATED",
      description: "New Task Description UPDATED",
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryTasksRepository.items[0]).toEqual(
      expect.objectContaining({
        title: "New Task 01",
        description: "New Task Description",
      })
    );
  });
});
