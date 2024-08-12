import { AggregateRoot, UniqueEntityID } from '@building-blocks/core';
import { CryptoPrice } from './crypto-price-provider.service';
import { BusinessRuleValidationError } from '@errors/business-rule-validation.error';

interface CryptoChangeAnalyticsProps {
  prices: CryptoPrice[];
}

export class CryptoChangeAnalytics extends AggregateRoot<CryptoChangeAnalyticsProps> {
  private constructor(props: CryptoChangeAnalyticsProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ prices }: CryptoChangeAnalyticsProps) {
    return new CryptoChangeAnalytics({ prices }, UniqueEntityID.generateUUID());
  }

  public analyzePriceChanges() {
    if (this.props.prices.length < 2) {
      throw new BusinessRuleValidationError('To analyze price change you need to provide at least 2 prices.');
    }

    // TODO: add timestamp to price changes
    const historicalDataChanges: string[] = [];

    for (let i = 0; i < this.props.prices.length - 2; i++) {
      const previousPrice = this.props.prices[i];
      const currentPrice = this.props.prices[i + 1];

      const priceChange = ((currentPrice.closePrice - previousPrice.closePrice) / previousPrice.closePrice) * 100;

      historicalDataChanges.push(`${priceChange.toFixed(2)}%`);
    }

    // TODO: add up,down marker

    return historicalDataChanges;
  }
}
