import { ApplicationError } from '@errors/app.error';
import { BusinessRuleValidationError } from '@errors/business-rule-validation.error';
import {
  CryptoPrice,
  CryptoPriceProvider,
  FetchPriceHistoryBySymbolPayload,
} from '@modules/crypto-changes/core/crypto-price-provider.service';
import axios, { AxiosError } from 'axios';
import { isAfter, startOfDay, sub } from 'date-fns';
import { backOff } from 'exponential-backoff';

export class BinanceCryptoPriceProvider implements CryptoPriceProvider {
  private readonly BINANCE_API_URL = 'https://api.binance.com/api/v3';

  private cacheTimestamp: Date | null = null;
  private cachedResponse: CryptoPrice[] = [];

  public async fetchPriceHistoryBySymbol(payload: FetchPriceHistoryBySymbolPayload): Promise<CryptoPrice[]> {
    if (
      this.cacheTimestamp &&
      isAfter(
        this.cacheTimestamp,
        sub(new Date(), {
          minutes: 1,
        }),
      ) &&
      this.cachedResponse.length > 0
    ) {
      this.cacheTimestamp = new Date();
      return this.cachedResponse;
    }

    const result = await backOff(async () => this.tryRetrievePriceHistoryBySymbol(payload), {
      numOfAttempts: 3,
      retry: (error: AxiosError) => {
        if (error.name === BusinessRuleValidationError.name) {
          return false;
        }

        if (!error.response?.status) {
          return false;
        }

        return error.response?.status < 500;
      },
    });

    this.cacheTimestamp = new Date();
    this.cachedResponse = result;

    return result;
  }

  private async tryRetrievePriceHistoryBySymbol({
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

    if (!result.data.length) {
      throw new BusinessRuleValidationError('There is no data.');
    }

    if (result.data.some((entry: string[]) => entry.length < 6)) {
      throw new BusinessRuleValidationError('The entry data is not valid.');
    }

    if (typeof result.data[0][4] !== 'string' || typeof result.data[0][6] !== 'number') {
      throw new ApplicationError('There is change in API response.');
    }

    return result.data.map((entry: string[]) => ({
      symbol,
      closePrice: Number((Number(entry[4]) * 100).toFixed(2)),
      timestamp: new Date(entry[6]),
    }));
  }
}
