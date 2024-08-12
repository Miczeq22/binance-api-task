import { QueryBus } from '@building-blocks/app';
import { GetBtcHistoricalPriceChangesQuery } from '@modules/crypto-changes/app/queries/get-btc-historical-price-changes/get-btc-historical-price-changes.query';
import { RequestHandler } from 'express';

interface Dependencies {
  queryBus: QueryBus;
}

const getBtcHistoricalPriceChangesAction =
  ({ queryBus }: Dependencies): RequestHandler =>
  (_, res, next) =>
    queryBus
      .handle(
        new GetBtcHistoricalPriceChangesQuery({
          from: new Date(),
          to: new Date(),
        }),
      )
      .then((priceChanges) => res.status(200).json(priceChanges))
      .catch(next);

export default getBtcHistoricalPriceChangesAction;
