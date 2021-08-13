import { discordAuth, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { Profile } from '@soulkiller/common';
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
          name: Joi.string().required()
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
    const { name } = req.params as unknown as { name: string };

    const [profile] = await this.sql<[Profile?]>`SELECT * FROM profiles WHERE profile_name = ${name} AND user_id = ${req.user!.id}`;

    if (!profile) {
      return next(notFound('Profile was not found'));
    }

    await this.sql`DELETE FROM profiles WHERE profile_name = ${name} AND user_id = ${req.user!.id}`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify({}));
  }
}
