import express, { Application } from 'express';

export class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  public async init() {
    this.app.use(express.json());

    this.app.use('/health', (_, res) => {
      return res.status(200).send('OK');
    });
  }

  public getApp() {
    return this.app;
  }
}
