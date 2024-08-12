import { ApplicationError } from '@errors/app.error';
import { BusinessRuleValidationError } from '@errors/business-rule-validation.error';

import { BusinessRule } from './business-rule';

export abstract class ValueObject<PropsType extends object = object> {
  constructor(public readonly props: PropsType) {}

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

  public equals(object: ValueObject<PropsType>) {
    if (!object) {
      return false;
    }

    if (!(object instanceof ValueObject)) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(object.props);
  }
}
