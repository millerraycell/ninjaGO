import express, {json} from 'express';
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes';
import errorHandler from './errors/errorHandler';

const app = express()

mongoose.connect('mongodb://localhost:27017/ninjasdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(3333)