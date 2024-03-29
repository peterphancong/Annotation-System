const express = require('express')
const sequelize = require('sequelize')
// const dotenv = require('dotenv').config()
// const cookieParser = require('cookie-parser')
const db = require('./Models')
const userRoutes = require ('./Routes/userRoutes')
const annotationRoutes = require ('./Routes/annotationRoutes')
//setting up your port
const PORT = process.env.PORT || 3000
//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())
// synchronizing the database and forcing it to false so we dont lose data
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("db has been re sync")
// })
//routes for the user API
app.use('/api', userRoutes)
app.use('/api', annotationRoutes)
//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
