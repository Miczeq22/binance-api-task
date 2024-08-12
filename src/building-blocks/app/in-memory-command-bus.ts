import { NotFoundError } from '@errors/not-found.error';

import { Command } from './command';
import { CommandBus } from './command-bus';
import { CommandHandler } from './command-handler';

interface CommandHandlers {
  [key: string]: CommandHandler<Command, object | boolean | number | string | void>;
}

interface Dependencies {
  commandHandlers: CommandHandler<Command, object | boolean | number | string | void>[];
}

export class InMemoryCommandBus implements CommandBus {
  private existingCommandHandlers: CommandHandlers = {};

  constructor(dependencies: Dependencies) {
    this.existingCommandHandlers = dependencies.commandHandlers.reduce(
      (
        commandHandlers: CommandHandlers,
        currentHandler: CommandHandler<Command, object | boolean | number | string | void>,
      ) => {
        return {
          ...commandHandlers,
          [this.getConstructorName(currentHandler)]: currentHandler,
        };
      },
      {},
    );
  }

  public async handle<ResponseType = unknown>(command: Command): Promise<ResponseType> {
    const existingCommandHandler = this.existingCommandHandlers[this.getCommandHandlerName(command)];

    if (!existingCommandHandler) {
      throw new NotFoundError(`Command Handler for command: "${this.getConstructorName(command)}" does not exist.`);
    }

    return existingCommandHandler.handle(command) as ResponseType;
  }

  private getConstructorName(object: object) {
    return object.constructor.name;
  }

  private getCommandHandlerName(command: Command) {
    return `${this.getConstructorName(command)}Handler`;
  }
}
