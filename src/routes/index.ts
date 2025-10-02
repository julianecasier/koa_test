import Router from '@koa/router';
import { userModule } from '@modules/user';
import { serverConfig } from 'config/env';
import { renderHomePage } from '../views/home.view';

const mainRouter = new Router();
const apiPrefix = serverConfig.apiPrefix;

// Route principale - Page d'accueil avec liste des routes
mainRouter.get('/', ctx => {
  // Récupérer les routes système
  const systemRoutes = mainRouter.stack
    .filter(layer => layer.path && layer.methods.length > 0)
    .map(layer => ({
      path: layer.path,
      methods: layer.methods.filter(m => m !== 'HEAD'),
    }));

  // Rendre la vue HTML
  ctx.type = 'html';
  ctx.body = renderHomePage({
    port: serverConfig.port,
    systemRoutes,
  });
});

// Route de health check
mainRouter.get('/health', ctx => {
  ctx.body = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Routes utilisateurs
mainRouter.use(
  `${apiPrefix}/users`,
  userModule.router.routes(),
  userModule.router.allowedMethods()
);

export default mainRouter;
