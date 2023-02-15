// const Koa = require('koa')

// const app = new Koa()

// app.use(async ctx => {
//     ctx.body = 'Hello World'
// })

// app.listen(3000)

const { User } = require('./src/User/domain')


const user = new User('Gus', 'Valle', new Date(1999, 6, 26))
