import { randomBytes } from 'crypto';

export class State {
  public static from(data: string): State {
    const bytes = Buffer.from(data, 'base64');
    const nonce = bytes.slice(0, 16);
    const createdAt = new Date(bytes.readUInt32LE(16));
    const redirectURL = bytes.slice(20).toString();

    const state = new this(redirectURL);
    state.nonce = nonce;
    state.createdAt = createdAt;

    return state;
  }

  private nonce: Buffer = randomBytes(16);
  private createdAt: Date = new Date();

  public constructor(public readonly redirectUri: string) {}

  public toString(): string {
    return this.toBytes().toString('base64');
  }

  public toBytes(): Buffer {
    const time = Buffer.allocUnsafe(4);
    time.writeUInt32LE(Math.floor(this.createdAt.getTime() / 1000));
    return Buffer.concat([this.nonce, time, Buffer.from(this.redirectUri)]);
  }
}
