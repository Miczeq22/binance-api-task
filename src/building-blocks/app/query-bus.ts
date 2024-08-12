import { Query } from './query';

export interface QueryBus {
  handle<ResultType = unknown>(query: Query): Promise<ResultType>;
}
