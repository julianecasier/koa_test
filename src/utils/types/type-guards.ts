import { Prisma } from '@prisma/client';
import { ApiError, ErrorDetails } from './api-errors';
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isPrismaError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  if (typeof error !== 'object') return false;
  if (error === null) return false;
  if (!('code' in error)) return false;

  const code = (error as Record<string, unknown>).code;

  if (typeof code !== 'string') return false;

  return code.startsWith('P');
}

export function hasErrorCode(error: unknown): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export function hasMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export function hasName(error: unknown): error is { name: string } {
  return typeof error === 'object' && error !== null && 'name' in error;
}

// Type guard pour vérifier si c'est une erreur avec des erreurs de validation
export function hasValidationErrors(error: unknown): error is { errors: ErrorDetails } {
  return typeof error === 'object' && error !== null && 'errors' in error;
}

export function hasDetails(error: unknown): error is { details: ErrorDetails } {
  return typeof error === 'object' && error !== null && 'details' in error;
}

export function hasMeta(error: unknown): error is { meta: Record<string, unknown> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'meta' in error &&
    typeof (error as Record<string, unknown>).meta === 'object'
  );
}
