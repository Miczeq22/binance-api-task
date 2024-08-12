import { sub } from 'date-fns';
import { BinanceCryptoPriceProvider } from './binance-crypto-price-provider.service';

describe('[Infrastructure] BinanceCryptoPriceProvider', () => {
  test('should load the data from Binance API', async () => {
    const cryptoPriceProvider = new BinanceCryptoPriceProvider();

    const response = await cryptoPriceProvider.fetchPriceHistoryBySymbol({
      symbol: 'BTCUSDT',
      from: sub(new Date(), {
        days: 1,
      }),
      to: new Date(),
    });

    expect(response.length).toEqual(10);
  });
});
