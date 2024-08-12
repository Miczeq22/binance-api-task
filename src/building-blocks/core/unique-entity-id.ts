import { v4 } from 'uuid';
import crypto from 'node:crypto';
import { Identifier } from './identifier';

export class UniqueEntityID extends Identifier<string> {
  constructor(public readonly id: string) {
    super(id);
  }

  public static generateUUID(): UniqueEntityID {
    return new UniqueEntityID(v4());
  }

  public static generateHash(data: string): UniqueEntityID {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return new UniqueEntityID(hash.digest('hex'));
  }
}
