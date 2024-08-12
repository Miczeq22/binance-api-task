export interface CacheSetOptions {
  expireInSeconds?: number;
}

export interface Cache {
  get<TValue = string>(key: string): Promise<TValue | null>;

  set<TValue = string>(key: string, value: TValue, options?: CacheSetOptions): Promise<void>;

  remove(key: string): Promise<boolean>;
}
