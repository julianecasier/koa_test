import { Context, Next } from 'koa';
import { isHttpError } from 'utils/type-guards';

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: unknown) {
    let status = 500;
    let message = 'Erreur interne du serveur';
    let expose = false;

    if (isHttpError(err)) {
      status = err.status || err.statusCode || 500;
      message = err.message;
      expose = err.expose ?? status < 500; // Exposer les erreurs 4xx par défaut
    } else if (err instanceof Error) {
      // Erreur standard JavaScript
      message = err.message;

      expose = process.env.NODE_ENV === 'development';
    }

    // Logger l'erreur (avec plus de détails en dev)
    if (status >= 500) {
      console.error('🔴 Erreur serveur:', {
        message,
        status,
        path: ctx.path,
        method: ctx.method,
        stack: err instanceof Error ? err.stack : undefined,
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Erreur client:', {
        message,
        status,
        path: ctx.path,
      });
    }
    // Définir la réponse
    ctx.status = status;
    ctx.body = {
      error: expose ? message : 'Une erreur est survenue',
      status,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err instanceof Error ? err.stack : undefined,
        path: ctx.path,
      }),
    };

    // Émettre un événement pour un logger externe si besoin
    ctx.app.emit('error', err, ctx);
  }
}
