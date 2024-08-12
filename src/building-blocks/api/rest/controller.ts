import { Router } from 'express';

export abstract class Controller {
  public readonly route: string;
  public loadBeforeBodyParsing = false;

  constructor(route?: string) {
    this.route = route ?? '';
  }

  public abstract getRouter(): Router;
}
