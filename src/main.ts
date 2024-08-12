import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@errors': `${__dirname}/building-blocks/errors`,
  '@server': `${__dirname}/server`,
  '@building-blocks': `${__dirname}/building-blocks`,
  '@modules': `${__dirname}/modules`,
  '@database': `${__dirname}/database`,
  '@utils': `${__dirname}/utils`,
  '@domain-events': `${__dirname}/modules/domain-events`,
});

import 'reflect-metadata';
import { config } from 'dotenv';
import { createDIContainer } from './di-container';
import { Logger } from '@building-blocks/infrastructure/logger/logger';
import { Application } from 'express';
import { createServer } from 'http';
import { getIntegerEnvVar } from '@building-blocks/infrastructure/environments/utils';

config();

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
  process.exit(1);
});

(async () => {
  const container = await createDIContainer();

  const logger = container.resolve<Logger>('logger');
  const app = container.resolve<Application>('app');
  const port = getIntegerEnvVar('APP_PORT', 4600);

  const server = createServer(app);

  server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
})();
