import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { DeleteUserUseCase } from "./delete-user";
import { makeUser } from "test/factories/make-user-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to delete a user", async () => {
    makeUser({}, new UniqueEntityId("user-01"));

    await inMemoryUsersRepository.delete("user-01");

    const databaseUser = await inMemoryUsersRepository.findById("user-01");

    expect(inMemoryUsersRepository.items).toHaveLength(0);
    expect(databaseUser).toBeNull();
  });
});
