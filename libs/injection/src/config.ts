import { container } from 'tsyringe';
import { kConfig } from './symbols';

export interface Config {
  rootDomain: string;
  apiDomain: string;
  dashDomain: string;
  discordClientId: `${bigint}`;
  discordClientSecret: string;
  discordToken: string;
  discordScopes: string;
  dbUrl: string;
  redisUrl: string;
  nodeEnv: string;
  encryptionKey: string;
  cors: string | string[];
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  stripePriceId: string;
  amqpUrl: string;
}

export const initConfig = () => {
  const config: Config = {
    rootDomain: process.env.ROOT_DOMAIN!,
    apiDomain: process.env.API_DOMAIN!,
    dashDomain: process.env.DASH_DOMAIN!,
    discordClientId: process.env.DISCORD_CLIENT_ID as `${bigint}`,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET!,
    discordToken: process.env.DISCORD_TOKEN!,
    discordScopes: process.env.DISCORD_SCOPES?.split(',').join(' ') ?? '',
    dbUrl: process.env.DB_URL!,
    redisUrl: process.env.REDIS_URL!,
    nodeEnv: process.env.NODE_ENV ?? 'dev',
    encryptionKey: process.env.ENCRYPTION_KEY!,
    cors: process.env.CORS?.split(',') ?? '*',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    stripePriceId: process.env.STRIPE_PRICE_ID!,
    amqpUrl: process.env.AMQP_URL!
  };

  container.register<Config>(kConfig, { useValue: config });
  return config;
};
