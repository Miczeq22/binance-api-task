import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

export const parseActionParams =
  (schema: AnyZodObject): RequestHandler =>
  async (req, _, next) => {
    try {
      await schema.parseAsync(req.params);

      return next();
    } catch (error) {
      return next(error);
    }
  };
