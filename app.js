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
import userMiddleware from './middleware/userMiddleware.js';


const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const urlMongoDb = process.env.URLDB ?? 'mongodb+srv://ziotyr:90afudit@cluster0.n8bcm.mongodb.net/todos'

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
    secret: 'some body',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        collection: "sessions",
        url: urlMongoDb
    })
}))
app.use(csrf())
// ----------

// Middleware
app.use(variablesMiddleware)
app.use(userMiddleware)
// ----------

// Routers
app.use(todosRoute)
app.use(loginRoute)

// ----------

async function start() {
    try {
        await mongoose.connect(urlMongoDb, {
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