import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPutTaskGroupBody, TaskGroup } from '@soulkiller/common';
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
          name: Joi.string().required(),
          monitor_delay: Joi.number()
            .min(0)
            .max(2e4)
            .required(),
          retry_delay: Joi.number()
            .min(0)
            .max(2e4)
            .required(),
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
    const { name, monitor_delay, retry_delay } = req.body as ApiPutTaskGroupBody;

    const data: Omit<TaskGroup, 'id' | 'created_at'> = {
      user_id: req.user!.id,
      name,
      monitor_delay,
      retry_delay
    };

    const [taskGroup] = await this.sql<[TaskGroup]>`INSERT INTO task_groups ${this.sql(data)} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(taskGroup));
  }
}
