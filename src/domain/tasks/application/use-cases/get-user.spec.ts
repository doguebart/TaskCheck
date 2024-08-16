import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { GetUserUseCase } from "./get-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserUseCase;

describe("Get User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to get a user by id", async () => {
    const user = makeUser(
      {
        name: "Douglas Welber GET",
      },
      new UniqueEntityId("user-01")
    );

    await inMemoryUsersRepository.create(user);

    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      id: "user-01",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: expect.objectContaining({
        name: "Douglas Welber GET",
      }),
    });
  });

  it("should not be able to get a non existing user", async () => {
    const user = makeUser(
      {
        name: "Douglas Welber GET",
      },
      new UniqueEntityId("user-01")
    );

    await inMemoryUsersRepository.create(user);

    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      id: "user-02",
    });

    expect(result.isLeft()).toBe(true);
  });
});
