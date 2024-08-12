import Keyv from 'keyv';

import { Cache, CacheSetOptions } from '../cache.service';

import { KeyvRedis } from './keyv-redis';

export class RedisCache implements Cache {
  private readonly keyvRedis = new KeyvRedis();

  private client: Keyv;

  constructor() {
    // @ts-expect-error; KeyvRedis is not compatible with Keyv
    this.client = new Keyv<string>({
      store: this.keyvRedis,
    });
  }

  public async get<TValue = string>(key: string): Promise<TValue | null> {
    return this.client.get(key);
  }

  public async set<TValue = string>(key: string, value: TValue, options?: CacheSetOptions): Promise<void> {
    await this.client.set(key, value, options?.expireInSeconds ? options?.expireInSeconds * 1000 : undefined);
  }

  public async remove(key: string): Promise<boolean> {
    return this.client.delete(key);
  }

  public async clear(): Promise<void> {
    await this.client.clear();
  }
}
