import { BusinessRuleValidationError } from '@errors/business-rule-validation.error';
import { ApplicationError } from '@errors/app.error';

import { BusinessRule } from './business-rule';
import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<PropsType extends object = object> {
  constructor(
    protected readonly props: PropsType,
    protected readonly id: UniqueEntityID,
  ) {}

  protected static checkRule(
    rule: BusinessRule,
    ErrorType: typeof ApplicationError = BusinessRuleValidationError,
  ): void {
    if (rule.isBroken()) {
      throw new ErrorType(rule.message);
    }
  }

  protected static async checkRuleAsync(
    rule: BusinessRule,
    ErrorType: typeof ApplicationError = BusinessRuleValidationError,
  ): Promise<void> {
    const isBroken = await rule.isBroken();

    if (isBroken) {
      throw new ErrorType(rule.message);
    }
  }

  public equals(object: Entity<PropsType>) {
    if (!object) {
      return false;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return object.id.equals(this.id);
  }
}
