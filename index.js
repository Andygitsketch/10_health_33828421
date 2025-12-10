// Importing Express and EJS 

var express = require ('express')
var ejs = require('ejs')
const path = require('path')
var mysql = require('mysql2')
var dotenv = require('dotenv').config()
var session = require ('express-session')
const expressSanitizer = require('express-sanitizer')
const request = require('request')

// express application object
const app = express()
const port = 8000

//Using EJS templating engine
app.set('view engine', 'ejs')

// Added sanitisers
app.use(expressSanitizer());

// Body Parser
app.use(express.urlencoded({ extended: true }))

//Public folder created
app.use(express.static(path.join(__dirname, 'public')))

//Session
app.use(session({
    secret: 'somerandomhealthstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// application data
app.locals.healthData = {appName: "Body frame calculator"}

//putting in MySQL and environment variables
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
global.db = db;

//routes to be added
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

const usersRoutes = require('./routes/user')
app.use('/user', usersRoutes)

const healthRoutes = require('./routes/health')
app.use('/health', healthRoutes)


//web app is listening to port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))