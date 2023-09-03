import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPatchProfileGroupBody, ProfileGroup } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import { notFound } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PatchProfileRoute extends Route {
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
    const { name } = req.body as ApiPatchProfileGroupBody;

    const data: Partial<Omit<ProfileGroup, 'id' | 'created_at' | 'status' | 'user_id'>> = {
      name
    };

    const [profileGroup] = await this.sql<[ProfileGroup?]>`SELECT * FROM profile_groups WHERE id = ${id}`;

    if (!profileGroup) {
      return next(notFound('Profile Group was not found'));
    }

    const [updated] = await this.sql<[ProfileGroup]>`UPDATE profile_groups SET ${this.sql(data)} WHERE id = ${id} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
