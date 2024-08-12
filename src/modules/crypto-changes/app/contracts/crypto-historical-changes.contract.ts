export interface CryptoHistoricalChangesContract {
  symbol: string;
  priceChanges: {
    percentageChange: string;
    timestamp: Date;
  }[];
}
