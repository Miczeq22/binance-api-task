import { ContainerBuilder } from '@building-blocks/infrastructure';
import { asClass } from 'awilix';
import { CryptoChangesController } from './api/crypto-changes.controller';

export const cryptoChangesContainer = () =>
  new ContainerBuilder().setControllers([asClass(CryptoChangesController).singleton()]).build();
