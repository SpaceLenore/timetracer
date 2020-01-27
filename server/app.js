const express       = require("express")
const cors          = require('cors')
const morgan        = require('morgan')
const bodyParser    = require("body-parser")
const router        = require('./router')
const app           = express()
const port          = (process.env.PORT) ? process.env.PORT : 8000;

app.use(cors())

// Do not log during testing
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
}

app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded

// Routers
app.use('/', router)

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    })
})

// Start up server
const server = app.listen(port, () => {
    // Do not log startup in testing
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Timetracer Recall API running on port ${port}!`)
    }
})

module.exports = server
