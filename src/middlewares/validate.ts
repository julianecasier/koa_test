import { Context, Next } from 'koa';
import { z, ZodError } from 'zod';
import { ValidationError } from '@utils/types/api-errors.js';

// Non utilisé mais si l'est : à utiliser dans les routes et utiliser partout le ctx.state pour lire le body et voir le résultat

export const validateBody = <T extends z.ZodTypeAny>(schema: T) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      ctx.state.validatedBody = schema.parse(ctx.request.body);
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError('Erreur de validation');
      }
      throw error;
    }
  };
};

export const validateParams = <T extends z.ZodTypeAny>(schema: T) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      ctx.state.validatedParams = schema.parse(ctx.params);
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError('Paramètres invalides');
      }
      throw error;
    }
  };
};

export const validateQuery = <T extends z.ZodTypeAny>(schema: T) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      ctx.state.validatedQuery = schema.parse(ctx.query);
      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError('Query invalide');
      }
      throw error;
    }
  };
};
