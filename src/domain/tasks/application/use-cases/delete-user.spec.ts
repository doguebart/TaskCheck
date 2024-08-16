import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { DeleteUserUseCase } from "./delete-user";
import { makeUser } from "test/factories/make-user-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("Delete User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to delete a user", async () => {
    const user = makeUser({}, new UniqueEntityId("user-01"));

    await inMemoryUsersRepository.create(user);

    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      userId: "user-01",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(0);
  });
});
