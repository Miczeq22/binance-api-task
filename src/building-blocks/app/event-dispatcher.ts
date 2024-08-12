import { AggregateRoot, DomainEvent } from '@building-blocks/core';

export interface EventDispatcher {
  dispatchEvent(event: DomainEvent): Promise<void>;

  dispatchEventsForAggregate(aggregate: AggregateRoot): Promise<void>;
}
