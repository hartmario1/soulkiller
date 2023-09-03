import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPatchTaskGroupBody, TaskGroup } from '@soulkiller/common';
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
          monitor_delay: Joi.number()
            .min(0)
            .max(2e4),
          retry_delay: Joi.number()
            .min(0)
            .max(2e4)
            .required(),
        })
        .or('name', 'monitor', 'retry')
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
    const { name, monitor_delay, retry_delay } = req.body as ApiPatchTaskGroupBody;

    const data: Partial<Omit<TaskGroup, 'id' | 'created_at' | 'status' | 'user_id'>> = {
      name,
      monitor_delay,
      retry_delay
    };

    const [taskGroup] = await this.sql<[TaskGroup?]>`SELECT * FROM task_groups WHERE id = ${id}`;

    if (!taskGroup) {
      return next(notFound('Task Group was not found'));
    }

    const [updated] = await this.sql<[TaskGroup]>`UPDATE task_groups SET ${this.sql(data)} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
