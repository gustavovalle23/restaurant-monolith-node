require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { setupMiddlewares, setupRouters } = require('./middlewares');
const { injectDependencies } = require('./di');

const app = new Koa();

app.use(bodyParser());

const di = injectDependencies()

setupMiddlewares(app);
setupRouters(app, di)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
