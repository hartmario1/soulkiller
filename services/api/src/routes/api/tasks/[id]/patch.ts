import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kSql, ApiPatchTaskQuery, ApiPatchTaskBody, Task } from '@soulkiller/common';
import * as Joi from 'joi';
import { notFound } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PatchTaskRoute extends Route {
  public readonly middleware = [
    discordAuth(false),
    validate(
      Joi
        .object()
        .keys({
          id: Joi.string().required()
        })
        .required(),
      'query'
    ),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          recurring: Joi.boolean().required()
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
    const { id } = req.query as unknown as ApiPatchTaskQuery;
    const { recurring } = req.body as ApiPatchTaskBody;

    const [task] = await this.sql<[Task?]>`SELECT * FROM WHERE id = ${id}`;

    if (!task) {
      return next(notFound('Task was not found'));
    }

    const [updated] = await this.sql<[Task]>`UPDATE tasks SET recurring = ${recurring} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
