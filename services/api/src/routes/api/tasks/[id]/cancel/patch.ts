import { discordAuth, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { Task, Status } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import { notFound } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PatchTaskCancelRoute extends Route {
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
    )
  ];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    const { id } = req.params as unknown as { id: number };

    const [task] = await this.sql<[Task?]>`SELECT * FROM tasks WHERE id = ${id}`;

    if (!task) {
      return next(notFound('Task was not found'));
    }

    const [updated] = await this.sql<[Task]>`UPDATE tasks SET status = ${Status.waitingForCancel} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
