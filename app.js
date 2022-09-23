const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)// prevents being kicked out of session after changes in code by storing session in database.
//====^^^ Must refactor code to work with connect-mongo v4. Only works with v3.2.0
const connectDB = require('./config/db')
const { ppid } = require('process')

//loaded config
dotenv.config({ path: './config/config.env' })

//passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//logging
if (process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}

//Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs')


//Handlebars
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
    },
    defaultLayout: 'main',
    extname: '.hbs',
    })
) //use exphbs.engine to avoid errors. ".engine() calls the engine function from the "express-handlebars" package"
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'erman walt',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Set Global Variable
app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next()
})


//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))