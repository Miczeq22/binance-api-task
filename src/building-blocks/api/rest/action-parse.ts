import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

export const parseActionBody =
  (schema: AnyZodObject): RequestHandler =>
  async (req, _, next) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (error) {
      return next(error);
    }
  };
