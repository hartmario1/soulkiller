import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPutProxyGroupBody, ProxyGroup } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';

@injectable()
export default class PutProxiesRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          name: Joi.string().required(),
        })
        .required(),
      'body'
    )
  ];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response) {
    const { name } = req.body as ApiPutProxyGroupBody;

    const data: Omit<ProxyGroup, 'id' | 'created_at'> = {
      user_id: req.user!.id,
      name,
    };

    const [proxyGroup] = await this.sql<[ProxyGroup]>`INSERT INTO proxy_groups ${this.sql(data)} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(proxyGroup));
  }
}
