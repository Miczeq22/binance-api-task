import { ApplicationError } from './app.error';

export class InvalidValueObjectError extends ApplicationError {
  constructor(valueObjectName: string, value: unknown) {
    super(`${value} is not a valid value for ${valueObjectName}`, 'InvalidValueObjectError', 400);
  }
}
