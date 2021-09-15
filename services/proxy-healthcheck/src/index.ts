import 'reflect-metadata';

// Begin data collection
import { collectDefaultMetrics } from 'prom-client';
collectDefaultMetrics();

import Redis from 'ioredis';
import { container } from 'tsyringe';
import createLogger from '@soulkiller/logger';
import postgres from 'postgres';
import { initConfig, kLogger, kSql, kRedis } from '@soulkiller/injection';
import { Handler } from './Handler';

void (() => {
  const config = initConfig();
  const logger = createLogger('API');

  container.register(kLogger, { useValue: logger });
  container.register(kRedis, { useValue: new Redis(config.redisUrl) });
  container.register(
    kSql, {
      useValue: postgres(config.dbUrl, {
        onnotice: notice => logger.debug(JSON.stringify(notice, null, 2), { topic: 'DB NOTICE' })
      })
    }
  );

  container.resolve(Handler);
})();
