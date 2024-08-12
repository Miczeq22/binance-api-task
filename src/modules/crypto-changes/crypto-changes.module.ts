import { AppModuleDependencies, ModuleBuilder } from '@building-blocks/infrastructure';
import { cryptoChangesContainer } from './crypto-changes.container';
import { asValue } from 'awilix';

export const cryptoChangesModule = ({ logger }: AppModuleDependencies) => {
  const container = cryptoChangesContainer();

  container.register({
    logger: asValue(logger),
  });

  return new ModuleBuilder().setName('crypto-changes').setContainer(container).build();
};
