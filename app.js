const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

//loaded config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

//logging
if (process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'})) //use exphbs.engine to avoid errors. ".engine() calls the engine function from the "express-handlebars" package"
app.set('view engine', '.hbs')

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))