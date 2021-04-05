import { injectable } from 'tsyringe';
import { Route, discordAuth } from '@soulkiller/rest';
import type { Request, Response } from 'polka';

@injectable()
export default class DiscordAuthRoute extends Route {
  public readonly middleware = [discordAuth(false)];

  public handle(req: Request, res: Response) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(req.user!));
  }
}
