import { QueryHandler } from '@building-blocks/app';
import { GetBtcHistoricalPriceChangesQuery } from './get-btc-historical-price-changes.query';
import { CryptoHistoricalChangesContract } from '../../contracts/crypto-historical-changes.contract';
import { CryptoChangeAnalyticsRepository } from '@modules/crypto-changes/core/crypto-change-analytics.repository';

export type GetBtcHistoricalPriceChangesQueryResult = CryptoHistoricalChangesContract;

interface Dependencies {
  cryptoChangeAnalyticsRepository: CryptoChangeAnalyticsRepository;
}

export class GetBtcHistoricalPriceChangesQueryHandler
  implements QueryHandler<GetBtcHistoricalPriceChangesQuery, GetBtcHistoricalPriceChangesQueryResult>
{
  constructor(private readonly dependencies: Dependencies) {}

  public async handle(): Promise<GetBtcHistoricalPriceChangesQueryResult> {
    const { cryptoChangeAnalyticsRepository } = this.dependencies;

    const cryptoChangeAnalytics = await cryptoChangeAnalyticsRepository.findFirst();

    const priceChanges = cryptoChangeAnalytics.analyzePriceChanges();

    return {
      symbol: 'BTCUSDT',
      priceChanges: priceChanges.map((entry) => entry.toJSON()),
    };
  }
}
