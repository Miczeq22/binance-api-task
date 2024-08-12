import { ApplicationError } from './app.error';

export class EmailAlreadyTakenError extends ApplicationError {
  constructor() {
    super('This email is already taken.', EmailAlreadyTakenError.name, 400);
  }
}
