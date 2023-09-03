import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';
import { ApiDeleteProxyBody, Proxy } from '@soulkiller/common';

@injectable()
export default class DeleteProxyRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          proxy_group: Joi.string().allow(null)
        })
        .required()
    )
  ];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response) {
    const { proxy_group } = req.body as ApiDeleteProxyBody;

    const proxies: Proxy[] = [];

    if (proxy_group) {
      proxies.push(...(await this.sql<Proxy[]>`DELETE FROM proxies WHERE user_id = ${req.user!.id} AND group_id = ${proxy_group}`));
    } else {
      proxies.push(...(await this.sql<Proxy[]>`DELETE FROM proxies WHERE user_id = ${req.user!.id}`));
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(proxies));
  }
}
