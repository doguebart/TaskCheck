import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { FetchUserTasksUseCase } from "./fetch-user-tasks";
import { InMemoryTasksRepository } from "test/repositories/in-memory-tasks-repository";
import { makeTask } from "test/factories/make-task-factory";

let inMemoryTasksRepository: InMemoryTasksRepository;
let sut: FetchUserTasksUseCase;

describe("Fetch User Tasks", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new FetchUserTasksUseCase(inMemoryTasksRepository);
  });

  it("should be able to get all user tasks", async () => {
    const task1 = makeTask({
      title: "task-01",
      userId: new UniqueEntityId("user-01"),
    });

    const task2 = makeTask({
      title: "task-02",
      userId: new UniqueEntityId("user-01"),
    });

    const task3 = makeTask({
      title: "task-03",
      userId: new UniqueEntityId("user-02"),
    });

    inMemoryTasksRepository.items.push(task1, task2, task3);

    const result = await sut.execute({
      userId: "user-01",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.tasks).toHaveLength(2);
    expect(result.value?.tasks).toEqual([
      expect.objectContaining({
        title: "task-01",
      }),
      expect.objectContaining({
        title: "task-02",
      }),
    ]);
  });
});
