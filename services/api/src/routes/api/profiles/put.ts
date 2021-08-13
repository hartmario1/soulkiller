import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPutProfileBody, Profile } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import * as Joi from 'joi';
import { conflict } from '@hapi/boom';
import type { Sql } from 'postgres';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PutProfilesRoute extends Route {
  public override readonly middleware = [
    discordAuth(false),
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          profile_name: Joi.string().required(),
          email: Joi.string().required(),
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          phone: Joi.string().required(),
          username: Joi.string(),
          password: Joi.string(),
          address1: Joi.string().required(),
          address2: Joi.string(),
          city: Joi.string().required(),
          zip: Joi.string().required(),
          country: Joi.string().required(),
          state: Joi.string(),
          cname: Joi.string().required(),
          cnumber: Joi.string().required(),
          month: Joi.number().required(),
          year: Joi.number().required(),
          cvv: Joi.number().required(),
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
    const {
      profile_name,
      email,
      first_name,
      last_name,
      phone,
      username = null,
      password = null,
      address1,
      address2 = null,
      city,
      zip,
      country,
      state = null,
      cname,
      cnumber,
      month,
      year,
      cvv
    } = req.body as ApiPutProfileBody;

    const data: Profile = {
      user_id: req.user!.id,
      profile_name,
      email,
      first_name,
      last_name,
      phone,
      username,
      password,
      address1,
      address2,
      city,
      zip,
      country,
      state,
      cname,
      cnumber,
      month,
      year,
      cvv
    };

    const [profile] = await this.sql<[Profile?]>`INSERT INTO profiles ${this.sql(data)} ON CONFLICT DO NOTHING RETURNING *`;

    if (!profile) {
      return next(conflict('A profile with this name already exists'));
    }

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(profile));
  }
}
