import { kConfig, kLogger, Config } from '@soulkiller/injection';
import { container } from 'tsyringe';
import { forbidden, internal } from '@hapi/boom';
import fetch from 'node-fetch';
import type { APIGetAuthDiscordCallbackQuery, APIGetAuthDiscordRefreshBody } from '@soulkiller/common';
import type { Request, Response, NextHandler } from 'polka';
import type { Logger } from 'winston';
import type { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v8';

export const discordOAuth2 = async (req: Request, _: Response, next: NextHandler) => {
  const config = container.resolve<Config>(kConfig);
  const logger = container.resolve<Logger>(kLogger);

  const form = new URLSearchParams({
    client_id: config.discordClientId,
    client_secret: config.discordClientSecret,
    redirect_uri: `${config.apiDomain}/api/auth/discord/callback`,
    scope: config.discordScopes
  });

  const code = (req.query as Partial<APIGetAuthDiscordCallbackQuery> | undefined)?.code;

  if (code) {
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
  } else {
    form.append('grant_type', 'refresh_token');
    form.append('refresh_token', (req.body as APIGetAuthDiscordRefreshBody).refresh_token);
  }

  const result = await fetch(
    'https://discord.com/api/v8/oauth2/token', {
      method: 'POST',
      body: form.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  const oauthResponse: RESTPostOAuth2AccessTokenResult = await result.json();

  if (!result.ok) {
    logger.warn('Recieved weird discord data', {
      topic: `${code ? 'CALLBACK' : 'REFRESH'} OAUTH BAD DATA`,
      data: oauthResponse,
      userId: req.user!.id
    });

    return next(internal());
  }

  const { scope: returnedScope } = oauthResponse;
  if (returnedScope !== config.discordScopes) {
    return next(forbidden(`Expected scope "${config.discordScopes}" but received scope "${returnedScope}"`));
  }

  return oauthResponse;
};
