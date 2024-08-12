import { Application } from 'express';

export interface ModuleInitializator {
  init(app: Application): Promise<void>;
}
