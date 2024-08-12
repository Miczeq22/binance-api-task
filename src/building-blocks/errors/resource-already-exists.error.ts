import { ApplicationError } from './app.error';

export class ResourceAlreadyExistsError extends ApplicationError {
  constructor(message = 'Resource Already Exists.') {
    super(message, 'ResourceAlreadyExistsError', 409);
  }
}
