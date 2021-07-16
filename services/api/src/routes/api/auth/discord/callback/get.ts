import { injectable, inject } from 'tsyringe';
import { Config, kConfig, kSql } from '@soulkiller/injection';
import { APIGetAuthDiscordCallbackQuery } from '@soulkiller/common';
import { Route, State, discordAuth, validate, discordOAuth2 } from '@soulkiller/rest';
import * as Joi from 'joi';
import cookie from 'cookie';
import fetch from 'node-fetch';
import { Sql } from 'postgres';
import { badRequest } from '@hapi/boom';
import type { Request, Response, NextHandler } from 'polka';
import type { APIUser } from 'discord-api-types/v8';

@injectable()
export default class DiscordAuthCallbackRoute extends Route {
  public override readonly middleware = [
    validate(
      Joi
        .object()
        .keys({
          code: Joi.string().required(),
          state: Joi.string().required()
        })
        .required(),
      'query'
    ),
    discordAuth(true)
  ];

  public constructor(
    @inject(kConfig) public readonly config: Config,
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    const { state: stateQuery } = req.query as unknown as APIGetAuthDiscordCallbackQuery;

    const cookies = cookie.parse(req.headers.cookie ?? '');
    if (stateQuery !== cookies.state) {
      return next(badRequest('invalid state'));
    }

    const state = State.from(stateQuery);
    res.cookie('state', 'noop', { httpOnly: true, path: '/', expires: new Date('1970-01-01') });

    const response = await discordOAuth2(req, res, next);
    if (!response) return;

    const me: APIUser = await fetch(
      'https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${response.access_token}`
        }
      }
    ).then(r => r.json());

    await this.sql`
      INSERT INTO users (user_id, email)
      VALUES (${me.id}, ${me.email!})
      ON CONFLICT (user_id)
      DO UPDATE SET email = ${me.email!}
    `;

    res.cookie('access_token', response.access_token, {
      expires: new Date(Date.now() + (response.expires_in * 1000)),
      sameSite: 'strict',
      domain: this.config.rootDomain.replace(/h?t?t?p?s?:?\/?\/?/, ''),
      path: '/'
    });

    res.cookie('refresh_token', response.refresh_token, {
      expires: new Date(2030, 1),
      sameSite: 'strict',
      domain: this.config.rootDomain.replace(/h?t?t?p?s?:?\/?\/?/, ''),
      path: '/'
    });

    res.redirect(state.redirectUri);
    return res.end();
  }
}
