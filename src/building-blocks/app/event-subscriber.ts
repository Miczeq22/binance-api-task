import { DomainEvent } from '@building-blocks/core';

export interface EventSubscriber<EventType extends DomainEvent<object>> {
  type: string;

  handle(event: EventType): Promise<void>;
}
