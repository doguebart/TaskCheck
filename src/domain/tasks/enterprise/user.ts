import { Entity } from "src/core/entity";
import { UniqueEntityId } from "src/core/unique-entity-id";

export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email() {
    return this.email;
  }

  get password() {
    return this.password;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }
}
