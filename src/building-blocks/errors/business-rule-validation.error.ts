import { ApplicationError } from './app.error';

export class BusinessRuleValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'BusinessRuleValidationError', 400);
  }
}
