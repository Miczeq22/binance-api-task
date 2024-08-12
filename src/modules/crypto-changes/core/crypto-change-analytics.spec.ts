import { startOfDay } from 'date-fns';
import { CryptoChangeAnalytics } from './crypto-change-analytics.aggregate-root';

describe('[Core]: Crypto Change Analytics', () => {
  test('it should throw if there is less than 2 prices provided', () => {
    const cryptoChangeAnalytics = CryptoChangeAnalytics.fromPersistence({
      prices: [],
    });

    expect(() => cryptoChangeAnalytics.analyzePriceChanges()).toThrow(
      'To analyze price change you need to provide at least 3 prices.',
    );
  });

  test('#case-1 it should calculate the price change in percentage manner', () => {
    const cryptoChangeAnalytics = CryptoChangeAnalytics.fromPersistence({
      prices: [
        {
          symbol: 'BTCUSDT',
          timestamp: startOfDay(new Date('2024-08-12')),
          closePrice: 10000,
        },
        {
          symbol: 'BTCUSDT',
          timestamp: startOfDay(new Date('2024-08-12')),
          closePrice: 10000 / 2,
        },
        {
          symbol: 'BTCUSDT',
          timestamp: startOfDay(new Date('2024-08-12')),
          closePrice: 10000,
        },
        {
          symbol: 'BTCUSDT',
          timestamp: startOfDay(new Date('2024-08-12')),
          closePrice: 10000,
        },
      ],
    });

    const result = cryptoChangeAnalytics.analyzePriceChanges().map((entry) => entry.toJSON());

    expect(result).toEqual([
      {
        percentageChange: '-50.00%',
        timestamp: new Date('2024-08-11T22:00:00.000Z'),
      },
      {
        percentageChange: '100.00%',
        timestamp: new Date('2024-08-11T22:00:00.000Z'),
      },
    ]);
  });
});
