import { ApplicationError } from './app.error';

export class UnauthenticatedError extends ApplicationError {
  constructor(message = 'Unauthenticated.') {
    super(message, 'UnauthenticatedError', 403);
  }
}
