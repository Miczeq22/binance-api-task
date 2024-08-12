import { ApplicationError } from '@errors/app.error';

export class InputValidationError extends ApplicationError {
  constructor(message = 'Input Validation Error.') {
    super(message, 'InputValidationError', 422);
  }
}
