import { ValueObject } from '@building-blocks/core';

interface CryptoPriceChangeProps {
  percentageChange: string;
  timestamp: Date;
}

export class CryptoPriceChange extends ValueObject<CryptoPriceChangeProps> {
  private constructor(props: CryptoPriceChangeProps) {
    super(props);
  }

  public static createNew(payload: CryptoPriceChangeProps) {
    return new CryptoPriceChange(payload);
  }

  public toJSON() {
    return this.props;
  }
}
