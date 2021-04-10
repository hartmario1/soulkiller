import { injectable } from 'tsyringe';
import { Route, discordAuth } from '@soulkiller/rest';
import type { Request, Response } from 'polka';

@injectable()
export default class GetUserRoute extends Route {
  public readonly middleware = [discordAuth(false)];

  public handle(req: Request, res: Response) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    const { public_flags, premium_type, flags, verified, locale, mfa_enabled, system, bot, email, ...user } = req.user!;
    return res.end(JSON.stringify(user));
  }
}
