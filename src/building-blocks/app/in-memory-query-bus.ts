import { NotFoundError } from '@errors/not-found.error';

import { Query } from './query';
import { QueryBus } from './query-bus';
import { QueryHandler } from './query-handler';

interface QueryHandlers {
  [key: string]: QueryHandler<Query, object | boolean | number | string | null>;
}

interface Dependencies {
  queryHandlers: QueryHandler<Query, object | boolean | number | string | null>[];
}

export class InMemoryQueryBus implements QueryBus {
  private existingQueryHandlers: QueryHandlers = {};

  constructor(dependencies: Dependencies) {
    this.existingQueryHandlers = dependencies.queryHandlers.reduce(
      (
        queryHandlers: QueryHandlers,
        currentHandler: QueryHandler<Query, object | boolean | number | string | null>,
      ) => {
        return {
          ...queryHandlers,
          [this.getConstructorName(currentHandler)]: currentHandler,
        };
      },
      {},
    );
  }

  public async handle<ResultType = unknown>(query: Query): Promise<ResultType> {
    const existingQueryHandler = this.existingQueryHandlers[this.getQueryHandlerName(query)];

    if (!existingQueryHandler) {
      throw new NotFoundError(`Query Handler for query: "${this.getConstructorName(query)}" does not exist.`);
    }

    return existingQueryHandler.handle(query) as ResultType;
  }

  private getConstructorName(object: object) {
    return object.constructor.name;
  }

  private getQueryHandlerName(query: Query) {
    return `${this.getConstructorName(query)}Handler`;
  }
}
