import { container } from 'tsyringe';
import { kConfig } from './symbols';

export interface Config {
  rootDomain: string;
  apiDomain: string;
  discordClientId: `${bigint}`;
  discordClientSecret: string;
  discordToken: string;
  discordScopes: string;
  dbUrl: string;
  nodeEnv: string;
  encryptionKey: string;
  cors: string | string[];
}

export const initConfig = () => {
  const config: Config = {
    rootDomain: process.env.ROOT_DOMAIN!,
    apiDomain: process.env.API_DOMAIN!,
    discordClientId: process.env.DISCORD_CLIENT_ID as `${bigint}`,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET!,
    discordToken: process.env.DISCORD_TOKEN!,
    discordScopes: process.env.DISCORD_SCOPES!.split(',').join(' '),
    dbUrl: process.env.DB_URL!,
    nodeEnv: process.env.NODE_ENV ?? 'dev',
    encryptionKey: process.env.ENCRYPTION_KEY!,
    cors: process.env.CORS?.split(',') ?? '*'
  };

  container.register<Config>(kConfig, { useValue: config });
  return config;
};
