import { getIntegerEnvVar, getStringEnvVar } from '@building-blocks/infrastructure/environments/utils';
import EventEmitter from 'events';

import { Redis } from 'ioredis';

export class KeyvRedis extends EventEmitter {
  private readonly redis: Redis = new Redis({
    port: getIntegerEnvVar('REDIS_PORT'),
    host: getStringEnvVar('REDIS_HOST'),
  });

  constructor() {
    super();

    this.redis.on('error', (error) => {
      this.emit('error', error);
    });
  }

  public get(key: string) {
    return this.redis.get(key).then((value) => {
      return value || null;
    });
  }

  public set(key: string, value: string, expireInSeconds?: number) {
    if (expireInSeconds) {
      return this.redis.set(key, value, 'PX', expireInSeconds);
    }

    return this.redis.set(key, value);
  }

  public delete(key: string) {
    return this.redis.del(key).then((result) => {
      return result > 0;
    });
  }

  public async clear() {
    await this.redis.flushall();
  }
}
