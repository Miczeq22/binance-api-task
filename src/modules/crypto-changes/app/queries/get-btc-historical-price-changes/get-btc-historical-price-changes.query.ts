import { Query } from '@building-blocks/app';

interface Payload {
  from: Date;
  to: Date;
}

export class GetBtcHistoricalPriceChangesQuery implements Query<Payload> {
  constructor(public readonly payload: Payload) {}
}
