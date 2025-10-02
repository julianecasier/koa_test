import { Context, Next } from 'koa';

import { ErrorResponse } from '../utils/errors/api-errors.js';
import {
  hasDetails,
  hasMessage,
  hasMeta,
  hasName,
  hasValidationErrors,
  isApiError,
  isPrismaError,
} from 'utils/type-guards.js';

export const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error: unknown) {
    // Log l'erreur (utilise un vrai logger en prod comme Winston ou Pino)
    console.error('Error:', error);

    if (isApiError(error)) {
      ctx.status = error.statusCode;
      const response: ErrorResponse = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      };

      if (process.env.NODE_ENV === 'development' && error.stack) {
        response.error.stack = error.stack;
      }

      ctx.body = response;
      return;
    }

    // Erreurs Prisma
    if (isPrismaError(error)) {
      // Contrainte unique violée
      if (error.code === 'P2002') {
        ctx.status = 409;
        ctx.body = {
          success: false,
          error: {
            code: 'DUPLICATE_ENTRY',
            message: 'Une entrée avec ces valeurs existe déjà',
            details: hasMeta(error) ? error.meta : undefined,
          },
        } satisfies ErrorResponse;
        return;
      }

      // Record non trouvé
      if (error.code === 'P2025') {
        ctx.status = 404;
        ctx.body = {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Ressource non trouvée',
          },
        } satisfies ErrorResponse;
        return;
      }

      // Autre erreur Prisma
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: {
          code: error.code,
          message: hasMessage(error) ? error.message : 'Erreur de base de données',
        },
      } satisfies ErrorResponse;
      return;
    }

    // Erreurs de validation (Zod, Joi, etc.)
    if (hasName(error) && (error.name === 'ZodError' || error.name === 'ValidationError')) {
      ctx.status = 422;
      ctx.body = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Erreur de validation',
          details: hasValidationErrors(error)
            ? error.errors
            : hasDetails(error)
              ? error.details
              : undefined,
        },
      } satisfies ErrorResponse;
      return;
    }

    // Erreur 404 (route non trouvée)
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Route non trouvée',
        },
      } satisfies ErrorResponse;
      return;
    }

    // Erreur inconnue - 500
    const status =
      typeof error === 'object' && error !== null && 'statusCode' in error
        ? ((error as Record<string, unknown>).statusCode as number)
        : typeof error === 'object' && error !== null && 'status' in error
          ? ((error as Record<string, unknown>).status as number)
          : 500;

    ctx.status = status;
    ctx.body = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          process.env.NODE_ENV === 'production'
            ? 'Une erreur est survenue'
            : hasMessage(error)
              ? error.message
              : 'Erreur inconnue',
        ...(process.env.NODE_ENV === 'development' &&
          error instanceof Error && { stack: error.stack }),
      },
    } satisfies ErrorResponse;
  }
};
