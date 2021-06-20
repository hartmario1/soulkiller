import { discordAuth, Route } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kStripe, kConfig, Config, kSql, Customer } from '@soulkiller/common';
import { forbidden } from '@hapi/boom';
import type Stripe from 'stripe';
import type { Request, Response, NextHandler } from 'polka';
import type { Sql } from 'postgres';

@injectable()
export default class PostPaymentsPortalRoute extends Route {
  public override readonly middleware = [discordAuth(false)];

  public constructor(
    @inject(kStripe) public readonly stripe: Stripe,
    @inject(kConfig) public readonly config: Config,
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    if (!req.user!.sub) {
      return next(forbidden('you must be a subscriber'));
    }

    const [{ customer_id }] = await this.sql<[Pick<Customer, 'customer_id'>]>`
      SELECT customer_id FROM customers
      WHERE user_id = ${req.user!.id}
    `;

    const { url } = await this.stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: `${this.config.dashDomain}/dashboard`
    });

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');

    return res.end(JSON.stringify({ url }));
  }
}
