export interface ValidationErrorDetails {
  [field: string]: string | string[];
}

export interface PrismaErrorDetails {
  target?: string[];
  cause?: string;
}

export type ErrorDetails = ValidationErrorDetails | PrismaErrorDetails | Record<string, unknown>;

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ErrorDetails;
    stack?: string;
  };
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public details?: ErrorDetails
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(400, message, 'BAD_REQUEST', details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Non autorisé') {
    super(401, message, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Accès interdit') {
    super(403, message, 'FORBIDDEN');
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, `${resource} non trouvé(e)`, 'NOT_FOUND');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(409, message, 'CONFLICT', details);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: ValidationErrorDetails) {
    super(422, message, 'VALIDATION_ERROR', details);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Erreur interne du serveur') {
    super(500, message, 'INTERNAL_SERVER_ERROR');
  }
}
