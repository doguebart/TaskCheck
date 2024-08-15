import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { makeUser } from "test/factories/make-user-factory";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { UpdateUserUseCase } from "./update-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe("Update User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to update a user", async () => {
    const user = makeUser(
      {
        name: "Douglas Welber GET",
      },
      new UniqueEntityId("user-01")
    );

    await inMemoryUsersRepository.create(user);

    expect(inMemoryUsersRepository.items).toHaveLength(1);

    await sut.execute({
      userId: "user-01",
      name: "Douglas UPDATED",
    });

    expect(inMemoryUsersRepository.items[0].name).toEqual("Douglas UPDATED");
  });
});
