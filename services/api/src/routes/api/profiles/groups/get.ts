import { discordAuth, Route } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kSql } from '@soulkiller/injection';
import type { ProfileGroup } from '@soulkiller/common';
import type { Sql } from 'postgres';
import type { Request, Response } from 'polka';

@injectable()
export default class GetProfilesRoute extends Route {
  public override readonly middleware = [discordAuth(false)];

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response) {
    const tasks = await this.sql<ProfileGroup[]>`SELECT * FROM profile_groups WHERE user_id = ${req.user!.id}`;

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify(tasks));
  }
}
