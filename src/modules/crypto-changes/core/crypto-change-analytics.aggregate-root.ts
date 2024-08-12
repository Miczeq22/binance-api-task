import { AggregateRoot, UniqueEntityID } from '@building-blocks/core';
import { CryptoPrice } from './crypto-price-provider.service';
import { BusinessRuleValidationError } from '@errors/business-rule-validation.error';
import { CryptoPriceChange } from './crypto-price-change.value-object';

interface CryptoChangeAnalyticsProps {
  prices: CryptoPrice[];
}

export class CryptoChangeAnalytics extends AggregateRoot<CryptoChangeAnalyticsProps> {
  private readonly MIN_ARRAY_LENGTH = 3;

  private constructor(props: CryptoChangeAnalyticsProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ prices }: CryptoChangeAnalyticsProps) {
    return new CryptoChangeAnalytics({ prices }, UniqueEntityID.generateUUID());
  }

  public analyzePriceChanges() {
    if (this.props.prices.length < this.MIN_ARRAY_LENGTH) {
      throw new BusinessRuleValidationError(
        `To analyze price change you need to provide at least ${this.MIN_ARRAY_LENGTH} prices.`,
      );
    }

    const historicalDataChanges: CryptoPriceChange[] = [];

    for (let i = 0; i < this.props.prices.length - 2; i++) {
      const previousPrice = this.props.prices[i];
      const currentPrice = this.props.prices[i + 1];

      const priceChange = ((currentPrice.closePrice - previousPrice.closePrice) / previousPrice.closePrice) * 100;

      historicalDataChanges.push(
        CryptoPriceChange.createNew({
          percentageChange: `${priceChange.toFixed(2)}%`,
          timestamp: currentPrice.timestamp,
        }),
      );
    }

    return historicalDataChanges;
  }
}
