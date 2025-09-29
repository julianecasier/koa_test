import { PrismaClient } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { createUserRoutes } from './user.routes';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = createUserRoutes(userController);

// Export de l'objet module
export const userModule = {
  router: userRouter,
  controller: userController,
  service: userService,
};
