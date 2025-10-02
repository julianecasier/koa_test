// modules/task/presentation/routes/taskRoutes.ts
import Router from '@koa/router';
import { TaskController } from './task.controller';

export function createTaskRoutes(taskController: TaskController): Router {
  const router = new Router();

  router.post('/', taskController.create.bind(taskController));

  router.get('/:id', taskController.getById.bind(taskController));

  router.get('/', taskController.getAll.bind(taskController));

  router.put('/:id', taskController.update.bind(taskController));

  router.delete('/:id', taskController.delete.bind(taskController));

  return router;
}
