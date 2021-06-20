import { discordAuth, Route } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kStripe, kConfig, Config } from '@soulkiller/common';
import { badRequest } from '@hapi/boom';
import type Stripe from 'stripe';
import type { Request, Response, NextHandler } from 'polka';

@injectable()
export default class PostPaymentsCreateRoute extends Route {
  public override readonly middleware = [discordAuth(false)];

  public constructor(
    @inject(kStripe) public readonly stripe: Stripe,
    @inject(kConfig) public readonly config: Config
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    try {
      const { id: sessionId } = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: this.config.stripePriceId,
            quantity: 1
          }
        ],
        success_url: `${this.config.dashDomain}/dashboard`,
        cancel_url: `${this.config.dashDomain}`,
        subscription_data: {
          metadata: {
            discordId: req.user!.id
          }
        }
      });

      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');

      return res.end(JSON.stringify({ sessionId }));
    } catch (e) {
      return next(badRequest(e.message));
    }
  }
}
