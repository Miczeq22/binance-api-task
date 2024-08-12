import { ApplicationError } from './app.error';

export class UnauthorizedError extends ApplicationError {
  constructor(message = 'Unauthorized.') {
    super(message, 'UnauthorizedError', 401);
  }
}
