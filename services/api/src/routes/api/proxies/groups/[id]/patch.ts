import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPatchProxyGroupBody, ProxyGroup } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import { notFound } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PatchTaskRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    validate(
      Joi
        .object()
        .keys({
          id: Joi.number().required()
        })
        .required(),
      'params'
    ),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          name: Joi.string(),
        })
        .or('name')
        .required(),
      'body'
    )
  ];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    const { id } = req.params as unknown as { id: number };
    const { name } = req.body as ApiPatchProxyGroupBody;

    const data: Partial<Omit<ProxyGroup, 'id' | 'created_at' | 'status' | 'user_id'>> = {
      name
    };

    const [proxyGroup] = await this.sql<[ProxyGroup?]>`SELECT * FROM proxy_groups WHERE id = ${id}`;

    if (!proxyGroup) {
      return next(notFound('Proxy Group was not found'));
    }

    const [updated] = await this.sql<[ProxyGroup]>`UPDATE proxy_groups SET ${this.sql(data)} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
