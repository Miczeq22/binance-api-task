import {
  CryptoPrice,
  CryptoPriceProvider,
  FetchPriceHistoryBySymbolPayload,
} from '@modules/crypto-changes/core/crypto-price-provider.service';
import axios from 'axios';
import { startOfDay } from 'date-fns';

export class BinanceCryptoPriceProvider implements CryptoPriceProvider {
  private readonly BINANCE_API_URL = 'https://api.binance.com/api/v3';

  public async fetchPriceHistoryBySymbol({
    symbol,
    from,
    to,
  }: FetchPriceHistoryBySymbolPayload): Promise<CryptoPrice[]> {
    const result = await axios.get(`${this.BINANCE_API_URL}/klines`, {
      params: {
        symbol,
        interval: '1h',
        startTime: startOfDay(from).getTime(),
        endTime: startOfDay(to).getTime(),
        limit: 10,
      },
    });

    // TODO: add validation
    // TODO: Add exponential backoff

    console.log({
      result: JSON.stringify(result.data, null, 2),
    });

    return result.data.map((entry: string[]) => ({
      symbol,
      closePrice: Number((Number(entry[4]) * 100).toFixed(2)),
    }));
  }
}
