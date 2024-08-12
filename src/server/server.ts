import { Controller } from '@building-blocks/api/rest/controller';
import express, { Application } from 'express';

interface Dependencies {
  controllers: Controller[];
}

export class Server {
  private readonly app: Application;

  constructor(private readonly dependencies: Dependencies) {
    this.app = express();
  }

  public async init() {
    const { controllers } = this.dependencies;

    this.app.use(express.json());

    this.app.use('/health', (_, res) => {
      return res.status(200).send('OK');
    });

    controllers.forEach((controller) => {
      this.app.use(controller.route, controller.getRouter());
    });
  }

  public getApp() {
    return this.app;
  }
}
