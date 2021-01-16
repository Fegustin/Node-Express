import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import path from 'path'
// Routers
import todosRoute from "./routes/todos.js"

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const urlMongoDb = 'mongodb+srv://ziotyr:90afudit@cluster0.n8bcm.mongodb.net/todos'

const app = express()

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static(path.resolve(__dirname, "static")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(todosRoute)
app.use(express.static(path.join(__dirname, 'public')))


async function start() {
    try {
        await mongoose.connect(urlMongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Server start ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()