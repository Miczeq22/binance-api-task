import { ContainerBuilder } from '@building-blocks/infrastructure';
import { asClass } from 'awilix';
import { CryptoChangesController } from './api/crypto-changes.controller';
import { BinanceCryptoChangeAnalyticsRepository } from './infrastructure/repositories/binance-crypto-change-analytics.repository';
import { BinanceCryptoPriceProvider } from './infrastructure/providers/binance-crypto-price-provider.service';
import { GetBtcHistoricalPriceChangesQueryHandler } from './app/queries/get-btc-historical-price-changes/get-btc-historical-price-changes.query-handler';

export const cryptoChangesContainer = () =>
  new ContainerBuilder()
    .loadActions()
    .setControllers([asClass(CryptoChangesController).singleton()])
    .setRepositories({
      cryptoChangeAnalyticsRepository: asClass(BinanceCryptoChangeAnalyticsRepository).singleton(),
    })
    .setServices({
      cryptoPriceProvider: asClass(BinanceCryptoPriceProvider).singleton(),
    })
    .setQueryHandlers([asClass(GetBtcHistoricalPriceChangesQueryHandler).singleton()])
    .build();
