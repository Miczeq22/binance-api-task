import { CryptoChangeAnalytics } from '@modules/crypto-changes/core/crypto-change-analytics.aggregate-root';
import { CryptoChangeAnalyticsRepository } from '@modules/crypto-changes/core/crypto-change-analytics.repository';
import { CryptoPriceProvider } from '@modules/crypto-changes/core/crypto-price-provider.service';
import { sub } from 'date-fns';

interface Dependencies {
  cryptoPriceProvider: CryptoPriceProvider;
}

export class BinanceCryptoChangeAnalyticsRepository implements CryptoChangeAnalyticsRepository {
  private DEFAULT_SYMBOL = 'BTCUSDT';

  constructor(private readonly dependencies: Dependencies) {}

  public async findFirst(): Promise<CryptoChangeAnalytics> {
    const { cryptoPriceProvider } = this.dependencies;

    const prices = await cryptoPriceProvider.fetchPriceHistoryBySymbol({
      symbol: this.DEFAULT_SYMBOL,
      from: sub(new Date(), {
        days: 1,
      }),
      to: new Date(),
    });

    return CryptoChangeAnalytics.fromPersistence({
      prices,
    });
  }
}
