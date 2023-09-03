import { discordAuth, Route } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kSql } from '@soulkiller/injection';
import type { Proxy } from '@soulkiller/common';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';

@injectable()
export default class GetProxiesRoute extends Route {
  public override readonly middleware = [discordAuth(false)];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response) {
    const proxies = await this.sql<Proxy[]>`SELECT * FROM proxy_groups WHERE user_id = ${req.user!.id}`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(proxies));
  }
}
