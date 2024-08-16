import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user";
import { compare } from "bcryptjs";
import { makeUser } from "test/factories/make-user-factory";
import { UserAlreadyExistsError } from "@/core/errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const result = await sut.execute({
      name: "Douglas Welber",
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Douglas Welber",
      })
    );
  });

  it("should hash user password", async () => {
    const result = await sut.execute({
      name: "Douglas Welber",
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    const hashedPassword = await compare(
      "123456",
      inMemoryUsersRepository.items[0].password
    );

    expect(result.isRight()).toBe(true);
    expect(hashedPassword).toBe(true);
  });

  it("should not be able to create a user with an existing e-mail", async () => {
    const user = makeUser({
      email: "douglas.welber@outlook.com",
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      name: "Douglas Welber",
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
  });
});
