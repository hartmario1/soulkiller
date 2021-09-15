import { discordAuth, Route } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kRedis, kSql } from '@soulkiller/injection';
import type { Proxy } from '@soulkiller/common';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';
import { Redis } from 'ioredis';
import { RedisStore } from '@cordis/redis-store';

@injectable()
export default class GetProxyRoute extends Route {
  public readonly statuses = new RedisStore<{ping: number}>({
    redis: this.redis,
    hash: 'proxy_status',
    decode: status => JSON.parse(status),
    encode: status => JSON.stringify(status)
  });

  public override readonly middleware = [discordAuth(false)];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>,
    @inject(kRedis) public readonly redis: Redis
  ) {
    super();
  }

  public async handle(req: Request, res: Response) {
    const proxies = await this.sql<Proxy[]>`SELECT * FROM proxies WHERE user_id = ${req.user!.id}`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(
      JSON.stringify(
        await Promise.all(
          proxies.map(async proxy => {
            const status = await this.statuses.get(`${proxy.ip}:${proxy.port}`);
            return { ...proxy, ping: status?.ping ?? null };
          })
        )
      )
    );
  }
}
