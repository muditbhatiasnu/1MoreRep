require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')

const app = express()
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();

})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on port 4000>..");
        })

    })
    .catch((error) => {
        console.log("erro in connecting to database")
    })
app.use('/api/workouts', workoutRoutes)
