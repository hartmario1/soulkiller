import polka, { Request, Response, NextHandler } from 'polka';
import { getPolkaOptions } from './utils/getPolkaOptions';
import cors from 'cors';
import helmet from 'helmet';
import cookie from 'cookie';
import { Histogram } from 'prom-client';
import { container } from 'tsyringe';
import { Config, kConfig, kLogger } from '@soulkiller/injection';
import type { Logger } from 'winston';

const responseTimes = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  // buckets for response time from 1ms to 500ms
  buckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5]
});

const requestSizes = new Histogram({
  name: 'http_request_size_bytes',
  help: 'Size of HTTP requests in bytes',
  labelNames: ['method', 'route', 'code'],
  // buckets for request size from 5 bytes to 10000 bytes
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
});

const responseSizes = new Histogram({
  name: 'http_response_size_bytes',
  help: 'Size of HTTP response in bytes',
  labelNames: ['method', 'route', 'code'],
  // buckets for response size from 5 bytes to 10000 bytes
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
});

declare module 'http' {
  export interface ServerResponse {
    append: (header: string, value: any) => void;
    redirect: (redirect: string) => void;
    cookie: (name: string, data: string, options?: cookie.CookieSerializeOptions) => void;
  }
}

export const createApp = () => {
  const logger = container.resolve<Logger>(kLogger);
  const config = container.resolve<Config>(kConfig);

  return polka(getPolkaOptions()).use(
    cors({
      origin: config.cors,
      credentials: true
    }),
    helmet({ contentSecurityPolicy: config.nodeEnv === 'prod' ? undefined : false }) as any,
    (_: Request, res: Response, next: NextHandler) => {
      res.append = (header, value) => {
        const prev = res.getHeader(header);
        if (prev) value = Array.isArray(prev) ? prev.concat(value) : [prev].concat(value);
        res.setHeader(header, value);
      };

      res.redirect = redirect => {
        res.statusCode = 302;
        res.append('Location', redirect);
        res.append('Content-Length', 0);
      };

      res.cookie = (name, data, options) => {
        const value = cookie.serialize(name, data, options);
        res.append('Set-Cookie', value);
      };

      return next();
    },
    (req: Request, res: Response, next: NextHandler) => {
      // Pointless to log metrics collection every 15 seconds.
      if (req.originalUrl !== '/metrics') {
        const endTimer = responseTimes.startTimer({ method: req.method.toUpperCase(), route: req.path });
        setTimeout(() => {
          endTimer();
          req.removeAllListeners('close');
        }, 15000);

        req.once('close', () => {
          const responseLength = parseInt((res.getHeader('content-length') ?? '0') as string, 10);
          requestSizes.observe(
            { method: req.method, route: req.path, code: res.statusCode }, parseInt(req.headers['content-length'] ?? '0', 10)
          );

          responseSizes.observe({ method: req.method, route: req.path, code: res.statusCode }, responseLength);
          const end = endTimer({ code: res.statusCode });

          logger.info(
            `${req.method.toUpperCase()} ${req.originalUrl}`,
            {
              topic: 'REQUEST COMPLETION',
              time: end / 1000,
              status: res.statusCode,
              statusText: res.statusMessage,
              body: req.body,
              params: req.params,
              query: req.query
            }
          );
        });
      }

      return next();
    }
  );
};

export * from './middleware';
export * from './utils';
export * from './Route';
