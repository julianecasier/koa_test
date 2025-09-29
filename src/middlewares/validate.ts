// import { Context, Next } from 'koa';
// import { z, ZodType, ZodError } from 'zod';

// export function validate<T>(schema: ZodType<T>) {
//   return async (ctx: Context, next: Next) => {
//     try {
//       const parsed = schema.parse(ctx.request.body);
//       ctx.request.body = parsed;
//       await next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         ctx.status = 400;
//         ctx.body = {
//           error: 'Validation error',
//           details: error.errors,
//         };
//         return;
//       }
//       throw error;
//     }
//   };
// }
