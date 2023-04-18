const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
    ctx.body = { message: 'Hello World' }
})

console.log('Server started')

app.listen(3000)
