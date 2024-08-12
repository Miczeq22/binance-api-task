import { Query } from './query';

export interface QueryHandler<
  QueryType extends Query<object>,
  ResultType extends object | boolean | number | string | null,
> {
  handle(query: QueryType): Promise<ResultType>;
}
