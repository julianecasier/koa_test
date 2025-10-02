
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { createUserRoutes } from './user.routes';


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
