import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import csrf from 'csurf'
import helmet from 'helmet'
import handlebars from 'express-handlebars'
import variablesMiddleware from "./middleware/variablesMiddleware.js"
import todosRoute from "./routes/todosRouter.js"
import loginRoute from "./routes/authRouter.js"
import mailRoute from "./routes/mailRouter.js"
import userMiddleware from './middleware/userMiddleware.js'
import * as keys from './keys/index.js'


const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000

const app = express()

// HTML collector
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
// ----------

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

// Sessions and csrf
const MongoStore = connectMongo(session);
app.use(session({
    secret: keys.default.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        collection: "sessions",
        url: keys.default.urlMongoDb
    })
}))
app.use(csrf({cookie: false}))
// ----------

// Middleware
app.use(variablesMiddleware)
app.use(userMiddleware)
// ----------

// Routers
app.use(todosRoute)
app.use(loginRoute)
app.use(mailRoute)
// ----------

async function start() {
    try {
        await mongoose.connect(keys.default.urlMongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}

start()
    .then(r => console.log("Start Server"))
    .catch(err => console.log(err))