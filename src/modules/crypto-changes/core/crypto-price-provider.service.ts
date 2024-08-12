export interface CryptoPrice {
  symbol: string;
  // In cents
  closePrice: number;
  timestamp: Date;
}

export interface FetchPriceHistoryBySymbolPayload {
  from: Date;
  to: Date;
  symbol: string;
}

export interface CryptoPriceProvider {
  fetchPriceHistoryBySymbol(payload: FetchPriceHistoryBySymbolPayload): Promise<CryptoPrice[]>;
}
