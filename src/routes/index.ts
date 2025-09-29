import Router from '@koa/router';
import {userModule} from '@modules/user';
import { serverConfig } from 'config/env';

// import taskRoutes from '@modules/task/task-routes';


const mainRouter = new Router();


const apiPrefix = serverConfig.apiPrefix;


mainRouter.use(
  `${apiPrefix}/users`,
  userModule.router.routes(),
  userModule.router.allowedMethods()
);


// Route de health check (utile pour le monitoring)
mainRouter.get('/health', (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() };
});

export default mainRouter;
