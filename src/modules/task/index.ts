import { UserController } from './task.controller';
import { UserService } from './task.service';
import { UserRepository } from './task.repository';
import { createUserRoutes } from './task.routes';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = createUserRoutes(userController);

// Export de l'objet module
export const userModule = {
  router: userRouter,
  controller: userController,
  service: userService,
};
