import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';

import { errorHandler } from './middlewares/error-handler';
import { serverConfig } from 'config/env';

const app = new Koa();

app.use(errorHandler);

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(serverConfig.port, () => {
  console.log(`🚀 Serveur sur le port ${serverConfig.port}`);
});
