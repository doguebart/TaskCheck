import { CreateTaskUseCase } from "./create-task";
import { InMemoryTasksRepository } from "test/repositories/in-memory-tasks-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateTaskUseCase;

describe("Create Task", () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateTaskUseCase(inMemoryTasksRepository);
  });

  it("should be able to create a new task", async () => {
    const result = await sut.execute({
      userId: "user-01",
      title: "New Task",
      description: "New Description",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryTasksRepository.items).toHaveLength(1);
    expect(result.value).toEqual({
      task: expect.objectContaining({
        title: "New Task",
      }),
    });
  });
});
