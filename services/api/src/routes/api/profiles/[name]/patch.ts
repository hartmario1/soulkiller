import { discordAuth, jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { ApiPatchProfileBody, Profile } from '@soulkiller/common';
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
          name: Joi.string().required()
        })
        .required(),
      'params'
    ),
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
        .or(
          'profile_name',
          'email',
          'first_name',
          'last_name',
          'phone',
          'username',
          'password',
          'address1',
          'address2',
          'city',
          'zip',
          'country',
          'state',
          'cname',
          'cnumber',
          'month',
          'year',
          'cvv',
        )
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
    const { name } = req.params as unknown as { name: string };
    const {
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
    } = req.body as ApiPatchProfileBody;

    const data: Partial<Omit<Profile, 'user_id'>> = {};

    if (profile_name) {
      data.profile_name = profile_name;
    }

    if (email) {
      data.email = email;
    }

    if (first_name) {
      data.first_name = first_name;
    }

    if (last_name) {
      data.last_name = last_name;
    }

    if (phone) {
      data.phone = phone;
    }

    if (username) {
      data.username = username;
    }

    if (password) {
      data.password = password;
    }

    if (address1) {
      data.address1 = address1;
    }

    if (address2) {
      data.address2 = address2;
    }

    if (city) {
      data.city = city;
    }

    if (zip) {
      data.zip = zip;
    }

    if (country) {
      data.country = country;
    }

    if (state) {
      data.state = state;
    }

    if (cname) {
      data.cname = cname;
    }

    if (cnumber) {
      data.cnumber = cnumber;
    }

    if (month) {
      data.month = month;
    }

    if (year) {
      data.year = year;
    }

    if (cvv) {
      data.cvv = cvv;
    }

    const [profile] = await this.sql<[Profile?]>`SELECT * FROM profiles WHERE profile_name = ${name}`;

    if (!profile) {
      return next(notFound('Profile was not found'));
    }

    const [updated] = await this.sql<[Profile]>`UPDATE profiles SET ${this.sql(data)} WHERE profile_name = ${name} RETURNING *`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(updated));
  }
}
