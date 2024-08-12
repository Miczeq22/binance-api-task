import { CryptoChangeAnalytics } from './crypto-change-analytics.aggregate-root';

export interface CryptoChangeAnalyticsRepository {
  findFirst(): Promise<CryptoChangeAnalytics>;
}
