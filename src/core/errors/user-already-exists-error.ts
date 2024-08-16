import { UseCaseError } from "./use-case-error";

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("This e-mail is already in use.");
  }
}
