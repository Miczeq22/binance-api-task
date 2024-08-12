import { Controller } from '@building-blocks/api/rest/controller';
import { RequestHandler, Router } from 'express';

interface Dependencies {
  getBtcHistoricalPriceChangesAction: RequestHandler;
}

export class CryptoChangesController extends Controller {
  constructor(private readonly dependencies: Dependencies) {
    super('/crypto-changes');
  }

  public getRouter(): Router {
    const { getBtcHistoricalPriceChangesAction } = this.dependencies;

    const router = Router();

    router.get('/', [getBtcHistoricalPriceChangesAction]);

    return router;
  }
}
