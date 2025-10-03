import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { createTaskRoutes } from './task.routes';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
const taskRouter = createTaskRoutes(taskController);

export const taskModule = {
  router: taskRouter,
  controller: taskController,
  service: taskService,
};
