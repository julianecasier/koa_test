export interface HttpError extends Error {
  status: number;
  statusCode?: number;
  expose?: boolean;
}

export function isHttpError(err: unknown): err is HttpError {
  return (
    err instanceof Error &&
    (('status' in err && typeof err.status === 'number') ||
      ('statusCode' in err && typeof err.statusCode === 'number'))
  );
}
