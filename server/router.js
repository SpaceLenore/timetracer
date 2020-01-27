const express       = require('express')
const jwt           = require('jsonwebtoken')
const f             = require('./functions')
const router        = express.Router()

router.get('/', (req, res, next) => {
    const data = {
        data: {
            title: "Timetracer Recall",
            text: "A minimal time tracking API"
        }
    }

    res.json(data)
})

router.post('/register', async (req, res, next) => {
    let tryCreateNewUser = await f.createUser(req.body)
    if (tryCreateNewUser) {
        res.json({status: "success", msg: "a user has been created for you"})
    } else {
        res.status(400).json({status: "error", msg: "failed to register a new user"})
    }
})

router.post('/login', async (req, res, next) => {
    let tryLogin = await f.loginUser(req.body)
    if (tryLogin) {
        let createdJwt = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET);
        res.json({status: "success", token: createdJwt})
    } else {
        res.status(400).json({status: "error", msg: "failed to login"})
    }
});

// Require authentication via JWT
router.use(async (req, res, next) => {
    if (req.headers.authorization) {
        let decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        if (decoded) {
            req.body.username = decoded.username
            next();
            return true;
        }
    }
    res.status(401).json({
        status: 'error',
        msg: 'authorization is required - missing jwt in authorization header'
    });
});

router.get('/data', async (req, res, next) => {
    let tryGetTimes = await f.getTimes(req.body.username)
    if (tryGetTimes) {
        res.json({status: "success", data: tryGetTimes})
    } else {
        res.status(400).json({status: "error", msg: "failed to fetch data for user " + req.body.username})
    }
})

router.get('/summary', async (req, res, next) => {
    let tryGetSummary = await f.count(req.body.username)
    if (tryGetSummary) {
        res.json({status: "success", hours:tryGetSummary})
    } else {
        res.status(400).json({status: "error",  msg: "failed to fetch summary for user " + req.body.username})
    }
})

router.post('/addtime', async (req, res, next) => {
    let trySetTime = await f.setCompleteTime(req.body)
    if (trySetTime) {
        res.json({status: "success", msg: "added time block"})
    } else {
        res.status(400).json({status: "error", msg: "failed to add time block"})
    }
})

router.post('/start', async (req, res, next) => {
    let tryStartTimer = await f.setStartTime(req.body)
    if (tryStartTimer) {
        res.json({status: "success", msg: "timer has been started"})
    } else {
        res.status(400).json({status: "error", msg: "failed to start timer"})
    }
})

router.post('/stop', async (req, res, next) => {
    let tryStopTimer = await f.setStopTime(req.body)
    if (tryStopTimer) {
        res.json({status: "success", msg: "timer has been stopped"})
    } else {
        res.status(400).json({status: "error", msg: "failed to start timer"})
    }
})

router.post('/update', async (req, res, next) => {
    let tryUpdateTimestamp = await f.updateTimestamp(req.body)
    if (tryUpdateTimestamp) {
        res.json({status: "success", msg: "timestamp updated"})
    } else {
        res.status(400).json({status: "error", msg: "failed to update timestamp"})
    }
})

router.post('/delete', async (req, res, next) => {
    let tryDelete = await f.deleteTimestamp(req.body.id, req.body.username)
    if (tryDelete) {
        res.json({status: "success", msg: "deleted timestamp"})
    } else {
        res.status(400).json({status: "error", msg: "failed to delete timestamp"})
    }
})

module.exports = router
