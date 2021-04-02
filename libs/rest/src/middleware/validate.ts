import { badData } from '@hapi/boom';
import type { AnySchema } from 'joi';
import type { Request, Response, NextHandler } from 'polka';

type ValidateMiddlewareProp = 'body' | 'query' | 'params' | 'headers' | 'body';

export const validate = (schema: AnySchema, prop: ValidateMiddlewareProp = 'body') => (req: Request, _: Response, next: NextHandler) => {
  const result = schema.validate(req[prop]);

  if (result.error) {
    return next(badData(result.error.message));
  }

  req[prop] = result.value;
  return next();
};
