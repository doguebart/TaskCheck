import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { compare } from "bcryptjs";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    await sut.execute({
      name: "Douglas Welber",
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Douglas Welber",
      })
    );
  });

  it("should hash user password", async () => {
    await sut.execute({
      name: "Douglas Welber",
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    const hashedPassword = await compare(
      "123456",
      inMemoryUsersRepository.items[0].password
    );

    expect(hashedPassword).toBe(true);
  });
});
