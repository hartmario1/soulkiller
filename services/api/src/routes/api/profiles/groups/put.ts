import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPutProfileGroupBody, ProfileGroup } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';

@injectable()
export default class PutProfilesRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          name: Joi.string().required(),
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
    const { name } = req.body as ApiPutProfileGroupBody;

    const data: Omit<ProfileGroup, 'id' | 'created_at'> = {
      user_id: req.user!.id,
      name
    };

    const [profileGroup] = await this.sql<[ProfileGroup]>`INSERT INTO profile_groups ${this.sql(data)} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(profileGroup));
  }
}
