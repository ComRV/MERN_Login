import express from 'express'
import cookieParser from 'cookie-parser'
import router from './Routes/routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use(router)
const port = 5000

mongoose.connect(`mongodb://rzd2508:${process.env.DB_PASS}@ac-xk8hmw4-shard-00-00.eoei0sh.mongodb.net:27017,ac-xk8hmw4-shard-00-01.eoei0sh.mongodb.net:27017,ac-xk8hmw4-shard-00-02.eoei0sh.mongodb.net:27017/Learn?ssl=true&replicaSet=atlas-ukimgm-shard-0&authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


