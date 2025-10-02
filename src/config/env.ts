import dotenv from 'dotenv';

dotenv.config();

export function env(key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Variable d'environnement manquante : ${key}`);
  }

  return value;
}

export const serverConfig = {
  port: env('PORT', '3000'),
  nodeEnv: env('NODE_ENV', 'development'),
  apiPrefix: env('API_PREFIX', '/api'),
  databaseUrl: env('DATABASE_URL'),
} as const;
