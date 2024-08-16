import { InMemoryTasksRepository } from "test/repositories/in-memory-tasks-repository";
import { makeTask } from "test/factories/make-task-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { GetTaskUseCase } from "./get-task";

let inMemoryTasksRepository: InMemoryTasksRepository;
let sut: GetTaskUseCase;

describe("Get Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new GetTaskUseCase(inMemoryTasksRepository);
  });

  it("should be able to get a task by id", async () => {
    const task1 = makeTask(
      {
        title: "Task-01",
      },
      new UniqueEntityId("task-01")
    );

    const task2 = makeTask(
      {
        title: "Task-02",
      },
      new UniqueEntityId("task-02")
    );

    inMemoryTasksRepository.items.push(task1, task2);

    expect(inMemoryTasksRepository.items).toHaveLength(2);

    const result = await sut.execute({
      taskId: "task-01",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      task: expect.objectContaining({
        title: "Task-01",
      }),
    });
  });

  it("should not be able to get a non existing task", async () => {
    const task1 = makeTask(
      {
        title: "Task-01",
      },
      new UniqueEntityId("task-01")
    );

    inMemoryTasksRepository.items.push(task1);

    expect(inMemoryTasksRepository.items).toHaveLength(1);

    const result = await sut.execute({
      taskId: "task-02",
    });

    expect(result.isLeft()).toBe(true);
  });
});
