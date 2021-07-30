import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { Store, ApiPutTasksBody, Task, Status } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';

@injectable()
export default class PutTasksRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          store: Joi.number()
            .min(0)
            .max(Store.undefeated)
            .required(),
          name: Joi.string().required(),
          size: Joi.number().required(),
          profile: Joi.number().required(),
          proxy: Joi.number().required(),
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

  public async handle(req: Request, res: Response) {
    const { store, name, size, profile, proxy, recurring } = req.body as ApiPutTasksBody;

    const data: Omit<Task, 'id' | 'created_at'> = {
      user_id: req.user!.id,
      status: Status.idle,
      store,
      name,
      size,
      profile,
      proxy,
      recurring
    };

    const [task] = await this.sql<[Task]>`INSERT INTO tasks ${this.sql(data)} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(task));
  }
}
