const express = require('express');
const app = express()
const mongoose = require('mongoose');
const {PORT,mongoUri} = require('../config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRouter = require('../routes/api/users')
const airportRouter = require('../routes/api/airports')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


mongoose
    .connect(mongoUri,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
    .then(()=>console.log('MongoDb Database Connected...'))
    .catch((err)=> console.log(err))

app.use('/api/Users',userRouter)
app.use('/api/airports',airportRouter)

app.listen(PORT,()=>{console.log(`App listening to at http://localhost:${PORT}`)})