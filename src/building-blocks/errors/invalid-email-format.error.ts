import { ApplicationError } from './app.error';

export class InvalidEmailFormatError extends ApplicationError {
  constructor(email: string) {
    super(`${email} is not a valid email`, 'InvalidEmailFormatError', 400);
  }
}
