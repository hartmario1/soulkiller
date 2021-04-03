import 'reflect-metadata';

// Begin data collection
import { collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics();

import { createApp, Route } from '@soulkiller/rest';
import { readdirRecurse } from '@gaius-bot/readdir';
import { join as joinPath } from 'path';
import { container } from 'tsyringe';
import createLogger from '@soulkiller/logger';
import postgres from 'postgres';
import { kLogger, kSql } from '@soulkiller/common';

void (async () => {
  const logger = createLogger('API');

  container.register(kLogger, { useValue: logger });
  container.register(
    kSql, {
      useValue: postgres(process.env.DB_URL!, {
        onnotice: notice => logger.debug(JSON.stringify(notice, null, 2), { topic: 'DB NOTICE' })
      })
    }
  );

  const app = createApp();

  const routes = joinPath(__dirname, 'routes');
  const files = readdirRecurse(routes, { fileExtension: 'js' });

  for await (const file of files) {
    logger.debug(`Resolving path ${file}`, { topic: 'API INIT' });

    const info = Route.pathToRouteInfo(file.split('/routes').pop()!);
    if (!info) {
      logger.warn(`Failed to dig out route metadata from path "${file}"`, { topic: 'API INIT' });
      continue;
    }

    logger.info(`Loading route "${info.method.toUpperCase()} ${info.path}"`, { topic: 'API INIT' });

    const route = container.resolve<Route>((await import(file)).default);
    route.register(info, app);
  }

  app.listen(3000, () => void logger.info('Listening to requests on port 3000', { topic: 'API INIT' }));
})();
