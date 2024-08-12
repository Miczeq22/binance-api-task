import { ApplicationError } from './app.error';

export class InvariantViolationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'InvariantViolationError', 500);
  }
}
