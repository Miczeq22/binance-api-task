import { logger } from '@building-blocks/infrastructure/logger/logger';
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

  const server = container.resolve<Server>('server');
  await server.init();

  container.register({
    app: asValue(server.getApp()),
  });

  return container;
};
