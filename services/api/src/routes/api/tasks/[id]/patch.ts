import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPatchTaskBody, Store, Task } from '@soulkiller/common';
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
          store: Joi.number()
            .min(0)
            .max(Store.undefeated),
          name: Joi.string(),
          size: Joi.number(),
          profile: Joi.number(),
          proxy: Joi.number(),
          recurring: Joi.boolean()
        })
        .or('store', 'name', 'size', 'profile', 'proxy', 'recurring')
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
    const { store, name, size, profile, proxy, recurring } = req.body as ApiPatchTaskBody;

    const data: Partial<Omit<Task, 'id' | 'created_at' | 'status' | 'user_id'>> = {
      store,
      name,
      size,
      profile,
      proxy,
      recurring
    };

    const [task] = await this.sql<[Task?]>`SELECT * FROM tasks WHERE id = ${id}`;

    if (!task) {
      return next(notFound('Task was not found'));
    }

    const [updated] = await this.sql<[Task]>`UPDATE tasks SET ${this.sql(data)} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
