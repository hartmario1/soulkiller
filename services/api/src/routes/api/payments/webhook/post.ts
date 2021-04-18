import { jsonParser, Route, validate } from '@soulkiller/rest';
import { inject, injectable } from 'tsyringe';
import { kStripe, kConfig, Config, kLogger, kSql } from '@soulkiller/common';
import Joi from 'joi';
import { badRequest } from '@hapi/boom';
import type Stripe from 'stripe';
import type { Request, Response, NextHandler } from 'polka';
import type { Logger } from 'winston';
import { Sql } from 'postgres';

@injectable()
export default class PostPaymentsWebhookRoute extends Route {
  public readonly middleware = [
    jsonParser(true),
    validate(
      Joi
        .object()
        .keys({
          priceId: Joi.string().required()
        })
        .required()
    )
  ];

  public constructor(
    @inject(kStripe) public readonly stripe: Stripe,
    @inject(kConfig) public readonly config: Config,
    @inject(kLogger) public readonly logger: Logger,
    @inject(kSql) public readonly sql: Sql<{}>
  ) {
    super();
  }

  public async handle(req: Request, res: Response, next: NextHandler) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody!,
        req.headers['stripe-signature'] as string,
        this.config.stripeWebhookSecret
      );
    } catch (e) {
      this.logger.warn('Webhook signature verification failed', { topic: 'STRIPE WEBHOOK' });
      return next(badRequest('webhook signature verification failed'));
    }

    switch (event.type) {
      case 'customer.subscription.created': {
        const data = event.data.object as Stripe.Subscription;

        await this.sql.begin(async sql => {
          await sql`
            INSERT INTO customers (user_id, customer_id)
            VALUES (${data.metadata.discordId!}, ${data.customer as string})
            ON CONFLICT DO NOTHING
          `;

          await sql`
            INSERT INTO subscriptions (user_id, subscription_id)
            VALUES (${data.metadata.discordId!}, ${data.id})
            ON CONFLICT DO NOTHING
          `;
        });

        break;
      }

      case 'customer.subscription.delete': {
        const data = event.data.object as Stripe.Subscription;
        await this.sql`DELETE FROM subscriptions WHERE subscription_id = ${data.id}`;

        break;
      }
    }
  }
}
