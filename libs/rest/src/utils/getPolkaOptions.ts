import { Boom, isBoom, notFound } from '@hapi/boom';
import { sendBoom } from './sendBoom';
import { createServer } from 'http';
import { container } from 'tsyringe';
import { kLogger } from '@soulkiller/common';
import type * as polka from 'polka';
import type { Logger } from 'winston';

export const getPolkaOptions = (): polka.IOptions => {
  const logger = container.resolve<Logger>(kLogger);
  return {
    onError(e: string | polka.IError, _: polka.Request, res: polka.Response) {
      res.setHeader('content-type', 'application/json');
      const boom = isBoom(e) ? e : new Boom(e);
      logger.error(boom.message, { topic: 'REQUEST INTERNAL ERRROR', ...boom });
      return sendBoom(boom, res);
    },
    onNoMatch(_: polka.Request, res: polka.Response) {
      res.setHeader('content-type', 'application/json');
      return sendBoom(notFound(), res);
    },
    // @ts-ignore
    server: createServer()
  };
};
