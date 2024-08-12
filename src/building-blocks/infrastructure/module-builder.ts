import { AwilixContainer } from 'awilix';
import { CronJob, EventSubscriber, ModuleInitializator } from '@building-blocks/app';
import { Controller } from '@building-blocks/api/rest/controller';

import { Logger } from './logger/logger';
import { Job } from '@building-blocks/app/job';
import { DomainEvent } from '@building-blocks/core';

export interface AppModule {
  name: string;
  getSubscribers(): EventSubscriber<DomainEvent>[];
  getControllers(): Controller[];
  getCronJobs(): CronJob[];
  getModuleInitializators(): ModuleInitializator[];
  getJobs(): Job[];
}

export interface AppModuleDependencies {
  logger: Logger;
  // eventDispatcher: EventDispatcher;
  // cache: Cache;
}

export class ModuleBuilder {
  private name!: string;

  private container!: AwilixContainer;

  public setName(name: string) {
    this.name = name;

    return this;
  }

  public setContainer(container: AwilixContainer) {
    this.container = container;

    return this;
  }

  public build(): AppModule {
    return {
      name: this.name,
      getSubscribers: () => {
        if (!this.container.hasRegistration('subscribers')) {
          return [];
        }

        return this.container.resolve('subscribers');
      },
      getControllers: () => {
        if (!this.container.hasRegistration('controllers')) {
          return [];
        }

        return this.container.resolve('controllers');
      },
      getCronJobs: () => {
        if (!this.container.hasRegistration('cronJobs')) {
          return [];
        }

        return this.container.resolve('cronJobs');
      },
      getModuleInitializators: () => {
        if (!this.container.hasRegistration('moduleInitialzators')) {
          return [];
        }

        return this.container.resolve('moduleInitialzators');
      },
      getJobs: () => {
        if (!this.container.hasRegistration('jobs')) {
          return [];
        }

        return this.container.resolve('jobs');
      },
    };
  }
}
