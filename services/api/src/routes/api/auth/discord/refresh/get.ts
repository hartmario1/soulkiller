import cookie from 'cookie';
import { inject, injectable } from 'tsyringe';
import { Route, discordAuth, discordOAuth2, validate, jsonParser } from '@soulkiller/rest';
import Joi from 'joi';
import { APIGetAuthDiscordRefreshBody, Config, kConfig } from '@soulkiller/common';
import { unauthorized } from '@hapi/boom';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class TokenRefreshRoute extends Route {
  public readonly middleware = [
    jsonParser(),
    validate(
      Joi
        .object()
        .keys({
          refresh_token: Joi.string().required()
        }),
      'body'
    ),
    discordAuth(true)
  ];

  public constructor(@inject(kConfig) public readonly config: Config) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler): Promise<void> {
    const response = await discordOAuth2(req, res, next);
    if (!response) return;

    const cookies = cookie.parse(req.headers.cookie ?? '');
    const token = cookies.refresh_token ?? (req.body as APIGetAuthDiscordRefreshBody | undefined)?.refresh_token;

    if (!token) {
      return next(unauthorized('missing refresh token'));
    }

    res.cookie('access_token', response.access_token, {
      expires: new Date(Date.now() + (response.expires_in * 1000)),
      sameSite: 'strict',
      domain: this.config.rootDomain.replace(/h?t?t?p?s?:?\/?\/?/, '')
    });

    return res.end();
  }
}
