import { Command } from './command';

export interface CommandBus {
  handle<ResponseType = unknown>(command: Command): Promise<ResponseType>;
}
