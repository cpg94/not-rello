import express from 'express'
import bodyParser from 'body-parser'
import users from './routes/users'
import boards from './routes/boards'
import './db'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/users', users)
app.use('/boards', boards)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    try {
        console.log('App listening on '+ PORT)
    } catch (e) {
        throw e
    }
})