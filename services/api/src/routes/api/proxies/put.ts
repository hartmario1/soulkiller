import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPutProxyBody, Proxy } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';
import { conflict } from '@hapi/boom';

@injectable()
export default class PutTasksRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          group_id: Joi.number().required(),
          ip: Joi.string().required(),
          port: Joi.string().required(),
          username: Joi.string().required(),
          password: Joi.string().required()
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

  public async handle(req: Request, res: Response, next: NextHandler) {
    const { group_id, ip, port, username, password } = req.body as ApiPutProxyBody;

    const data: Proxy = {
      user_id: req.user!.id,
      group_id,
      ip,
      port,
      username,
      password
    };

    const [proxy] = await this.sql<[Proxy?]>`INSERT INTO proxies ${this.sql(data)} ON CONFLICT DO NOTHING RETURNING *`;

    if (!proxy) {
      return next(conflict('This proxy already exists!'));
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(proxy));
  }
}
