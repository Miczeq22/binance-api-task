import { asClass, asFunction, AwilixContainer, createContainer, InjectionMode, Lifetime, Resolver } from 'awilix';
import {
  Command,
  CommandHandler,
  CronJob,
  EventSubscriber,
  InMemoryCommandBus,
  InMemoryQueryBus,
  ModuleInitializator,
  Query,
  QueryHandler,
} from '@building-blocks/app';
import { Controller } from '@building-blocks/api/rest/controller';

import { registerAsArray } from './register-as-array';
import { DomainEvent } from '@building-blocks/core';
import { Job } from '@building-blocks/app/job';
import { envConstants } from '../environments/utils';

interface CustomResolution {
  [key: string]: Resolver<unknown>;
}
export class ContainerBuilder {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.PROXY,
    });

    this.container.register({
      commandHandlers: registerAsArray([]),
      queryHandlers: registerAsArray([]),
      resolvers: registerAsArray([]),
      subscribers: registerAsArray([]),
      cronJobs: registerAsArray([]),
    });
  }

  public loadActions() {
    this.container.loadModules([envConstants.isProd ? 'dist/**/*.action.js' : 'src/**/*.action.ts'], {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SCOPED,
        register: asFunction,
      },
    });

    return this;
  }

  public setModuleInitialzators(middlewares: Resolver<ModuleInitializator>[]) {
    this.container.register({
      moduleInitialzators: registerAsArray(middlewares),
    });

    return this;
  }

  public setCommandHandlers(
    commandHandlers: Resolver<CommandHandler<Command, object | boolean | number | string | void>>[],
  ) {
    this.container.register({
      commandBus: asClass(InMemoryCommandBus).singleton(),
    });

    this.container.register({
      commandHandlers: registerAsArray(commandHandlers),
    });

    return this;
  }

  public setJobs(jobs: Resolver<Job>[]) {
    this.container.register({
      jobs: registerAsArray(jobs),
    });

    return this;
  }

  public setControllers(controllers: Resolver<Controller>[]) {
    this.container.register({
      controllers: registerAsArray(controllers),
    });

    return this;
  }

  public setCronJobs(cronJobs: Resolver<CronJob>[]) {
    this.container.register({
      cronJobs: registerAsArray(cronJobs),
    });

    return this;
  }

  public setServices(props: CustomResolution) {
    this.container.register(props);

    return this;
  }

  public setCustom(props: CustomResolution) {
    this.container.register(props);

    return this;
  }

  public setRepositories(repositories: CustomResolution) {
    this.container.register(repositories);

    return this;
  }

  public setQueryHandlers(queryHandlers: Resolver<QueryHandler<Query, object | boolean | number | string | null>>[]) {
    this.container.register({
      queryBus: asClass(InMemoryQueryBus).singleton(),
    });

    this.container.register({
      queryHandlers: registerAsArray(queryHandlers),
    });

    return this;
  }

  public setResolvers(resolvers: Resolver<unknown>[]) {
    this.container.register({
      resolvers: registerAsArray(resolvers),
    });

    return this;
  }

  public setSubscribers(subscribers: Resolver<EventSubscriber<DomainEvent>>[]) {
    this.container.register({
      subscribers: registerAsArray(subscribers),
    });

    return this;
  }

  public build() {
    return this.container;
  }
}
