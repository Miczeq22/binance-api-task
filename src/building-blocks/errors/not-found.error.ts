import { ApplicationError } from '@errors/app.error';

export class NotFoundError extends ApplicationError {
  constructor(message = 'Not Found.') {
    super(message, 'NotFoundError', 422);
  }
}
