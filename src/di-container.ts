import { AppModule, AppModuleDependencies, registerAsArray } from '@building-blocks/infrastructure';
import { logger } from '@building-blocks/infrastructure/logger/logger';
import { cryptoChangesModule } from '@modules/crypto-changes/crypto-changes.module';
import { Server } from '@server/server';
import { asClass, asValue, AwilixContainer, createContainer } from 'awilix';

export const createDIContainer = async (): Promise<AwilixContainer> => {
  const container = createContainer({
    injectionMode: 'PROXY',
  });

  container.register({
    server: asClass(Server).singleton(),
    logger: asValue(logger),
  });

  const moduleDependencies: AppModuleDependencies = {
    logger: container.resolve('logger'),
  };

  container.register({
    modules: registerAsArray([cryptoChangesModule(moduleDependencies)].map(asValue)),
  });

  const allControlles = container.resolve<AppModule[]>('modules').flatMap((module) => module.getControllers());

  container.register({
    controllers: asValue(allControlles),
  });

  const server = container.resolve<Server>('server');
  await server.init();

  container.register({
    app: asValue(server.getApp()),
  });

  return container;
};
