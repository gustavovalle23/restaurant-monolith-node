// const Koa = require('koa')

// const app = new Koa()

// app.use(async ctx => {
//     ctx.body = 'Hello World'
// })

// app.listen(3000)

const { User } = require('./src/User/domain')


const user = new User({
    firstName: 'Gus',
    lastName: 'Valle',
    address: { country: 'BR', state: 'SP', street: 'Street 12', number: 23 },
    birthDate: Date.now()
})

console.log(user)
