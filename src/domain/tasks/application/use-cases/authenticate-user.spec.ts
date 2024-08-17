import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { hash } from "bcryptjs";
import { makeUser } from "test/factories/make-user-factory";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate user", async () => {
    const user = makeUser({
      email: "douglas.welber@outlook.com",
      password: await hash("123456", 8),
    });

    inMemoryUsersRepository.items.push(user);
    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      email: "douglas.welber@outlook.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    const user = makeUser({
      email: "douglas.welber@outlook.com",
      password: await hash("123456", 8),
    });

    inMemoryUsersRepository.items.push(user);
    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      email: "douglaswelber@outlook.com",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const user = makeUser({
      email: "douglas.welber@outlook.com",
      password: await hash("123456", 8),
    });

    inMemoryUsersRepository.items.push(user);
    expect(inMemoryUsersRepository.items).toHaveLength(1);

    const result = await sut.execute({
      email: "douglas.welber@outlook.com",
      password: "wrong_password",
    });

    expect(result.isLeft()).toBe(true);
  });
});
