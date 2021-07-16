import { discordAuth, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiDeleteTaskQuery, Task } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import { notFound } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class DeleteTaskRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    validate(
      Joi
        .object()
        .keys({
          id: Joi.string().required()
        })
        .required(),
      'query'
    )
  ];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    const { id } = req.query as unknown as ApiDeleteTaskQuery;

    const [task] = await this.sql<[Task?]>`SELECT * FROM WHERE id = ${id}`;

    if (!task) {
      return next(notFound('Task was not found'));
    }

    await this.sql`DELETE FROM tasks WHERE id = ${id}`;

    res.statusCode = 204;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify({}));
  }
}