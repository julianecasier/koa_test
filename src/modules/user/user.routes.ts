// modules/user/presentation/routes/userRoutes.ts
import Router from '@koa/router';
import { UserController } from './user.controller.ts';

export function createUserRoutes(userController: UserController): Router {
  const router = new Router({ prefix: '/users' });

  router.post('/', userController.create.bind(userController));

  router.get('/:id', userController.getById.bind(userController));

  router.get('/', userController.getAll.bind(userController));

  router.put('/:id', userController.update.bind(userController));

  router.delete('/:id', userController.delete.bind(userController));

  return router;
}
