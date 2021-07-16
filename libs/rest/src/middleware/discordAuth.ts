import fetch from 'node-fetch';
import { unauthorized } from '@hapi/boom';
import cookie from 'cookie';
import { container } from 'tsyringe';
import { kSql } from '@soulkiller/injection';
import type { Subscription } from '@soulkiller/common';
import type { Request, Response, NextHandler } from 'polka';
import type { APIUser } from 'discord-api-types/v8';
import type { Sql } from 'postgres';

declare module 'polka' {
  export interface Request {
    user?: APIUser & { sub: boolean };
  }
}

export const discordAuth = (fallthrough = false) => async (req: Request, _: Response, next: NextHandler) => {
  const sql = container.resolve<Sql<{}>>(kSql);
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const token = cookies.access_token ?? req.headers.authorization;

  if (!token) {
    return next(fallthrough ? undefined : unauthorized('missing authorization header', 'Bearer'));
  }

  const result = await fetch(
    'https://discord.com/api/v8/users/@me', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  if (result.ok) {
    req.user = await result.json();
    const [sub] = await sql<[Subscription?]>`
      SELECT *
      FROM subscriptions
      WHERE user_id = ${req.user!.id}
    `;

    req.user!.sub = Boolean(sub);
  }

  return next(req.user || fallthrough ? undefined : unauthorized('invalid discord access token'));
};
