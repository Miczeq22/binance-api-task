import { Command } from './command';

export interface CommandHandler<
  CommandType extends Command<object>,
  ResultType extends object | boolean | number | string | void = void,
> {
  handle(command: CommandType): Promise<ResultType>;
}
