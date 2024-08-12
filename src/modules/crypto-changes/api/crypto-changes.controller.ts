import { Controller } from '@building-blocks/api/rest/controller';
import { Router } from 'express';

export class CryptoChangesController extends Controller {
  constructor() {
    super('/crypto-changes');
  }

  public getRouter(): Router {
    const router = Router();

    router.get('/', (_, res) =>
      res.status(200).json({
        message: 'Hello, World!',
      }),
    );

    return router;
  }
}
