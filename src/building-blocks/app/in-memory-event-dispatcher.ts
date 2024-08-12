import { AggregateRoot, DomainEvent } from '@building-blocks/core';
import { Logger } from '@building-blocks/infrastructure/logger/logger';

import { EventDispatcher } from './event-dispatcher';
import { EventSubscriber } from './event-subscriber';

interface Dependencies {
  subscribers: EventSubscriber<DomainEvent>[];
  logger: Logger;
}

export class InMemoryEventDispatcher implements EventDispatcher {
  constructor(private readonly dependencies: Dependencies) {}

  public async dispatchEvent(event: DomainEvent): Promise<void> {
    const subscriberHandlerPromises = this.dependencies.subscribers
      .filter((subscriber) => subscriber.type === event.name)
      .map((subscriber) =>
        subscriber.handle(event).catch((error) => {
          this.dependencies.logger.error(`Subscriber failed to handle event "${subscriber.type}".`, error);
        }),
      );

    if (!subscriberHandlerPromises.length) {
      return;
    }

    this.dependencies.logger.info(`Dispatching handlers for event "${event.name}".`);

    await Promise.all(subscriberHandlerPromises);
  }

  public async dispatchEventsForAggregate(aggregate: AggregateRoot): Promise<void> {
    const events = aggregate.getDomainEvents();

    const eventNames = events.map((event) => event.name);

    const subscriberHandlerPromises = this.dependencies.subscribers
      .filter((subscriber) => eventNames.includes(subscriber.type))
      .map((subscriber) => {
        const eventsForSubscriber = events.filter((event) => event.name === subscriber.type);

        return Promise.all(
          eventsForSubscriber.map((event) =>
            subscriber.handle(event).catch((error) => {
              this.dependencies.logger.error(`Subscriber failed to handle event "${subscriber.type}".`, error);

              throw error;
            }),
          ),
        );
      });

    if (!subscriberHandlerPromises.length) {
      return;
    }

    this.dependencies.logger.info(`Dispatching handlers for events ${eventNames.join(', ')}.`);

    await Promise.all(subscriberHandlerPromises);
  }
}
