const argon2    = require('argon2')
const moment    = require('moment')
const db        = require('./database')

const createUser = async (usr) => {
    if(!usr.username || !usr.password) {
        return false
    }
    try {
        const hash = await argon2.hash(usr.password)
        return db.exec("INSERT INTO users VALUES (?, ?)", [usr.username, hash])
        .then(() => {
            return true
        })
        .catch((err) => {
            console.warn(err)
            return false
        })
    } catch (err) {
        return false
    }
}

const loginUser = async (usr) => {
    return db.fetchOne("SELECT password FROM users WHERE username = ?", [usr.username])
    .then(async (res) => {
        try {
            if (await argon2.verify(res.password, usr.password)) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.warn(err);
            return false
        }
    })
    .catch((err) => {
        console.warn(err);
        return false;
    })
}

const getTimes = async (username) => {
    return db.fetchAll("SELECT rowid, title, start, stop FROM timestamps WHERE username IS ?", [username])
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const setCompleteTime = async (ts) => {
    if (!ts.username || !ts.title || !ts.start || !ts.stop) {
        console.log(ts)
        return false
    }
    return db.exec("INSERT INTO timestamps(username, title, start, stop) VALUES (?, ?, ?, ?)", [ts.username, ts.title, ts.start, ts.stop])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const setStartTime = async (ts) => {
    if (!ts.username || !ts.title) {
        console.log(ts)
        return false
    }
    ts.start = new Date().toISOString()
    return db.exec("INSERT INTO timestamps(username, title, start) VALUES (?, ?, ?)", [ts.username, ts.title, ts.start])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const setStopTime = async (ts) => {
    if (!ts.id) {
        console.log(ts)
        return false
    }
    ts.stop = new Date().toISOString()
    return db.exec("UPDATE timestamps SET stop = ? WHERE rowid = ? AND stop IS NULL", [ts.stop, ts.id])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const updateTimestamp = async (ts) => {
    if (!ts.id || !ts.title || !ts.start || !ts.stop || !ts.username) {
        console.log(ts)
        return false
    }
    return db.exec("UPDATE timestamps SET title=?, start=?, stop=? WHERE rowid=? AND username=?", [ts.title, ts.start, ts.stop, ts.id, ts.username])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const count = async (username) => {
    return db.fetchAll("SELECT rowid, title, start, stop FROM timestamps WHERE username IS ?", [username])
    .then((res) => {
        let hoursOfAllTime = 0
        let hoursInMonth = 0
        let hoursInWeek = 0
        let currentWeek = moment().format('W')
        let currentMonth = moment().format('M')
        for (let i = 0; i < res.length; i++) {
            if (res[i].stop === null) {
                continue
            }
            let end = moment(res[i].stop)
            hoursOfAllTime += moment.duration(end.diff(res[i].start)).asHours()
            if(moment(res[i].start).format('M') == currentMonth) {
                hoursInMonth += moment.duration(end.diff(res[i].start)).asHours()
            }
            if(moment(res[i].start).format('W') == currentWeek) {
                hoursInWeek += moment.duration(end.diff(res[i].start)).asHours()
            }
        }
        return {
            total: hoursOfAllTime,
            month: hoursInMonth,
            week: hoursInWeek
        }
    })
    .catch((err) => {
        console.warn(err)
        return false
    })
}

const deleteTimestamp = async (id, username) => {
    return db.exec("DELETE FROM timestamps WHERE rowid = ? AND username = ?", [id, username])
    .then(() => {
        return true
    })
    .catch((err) => {
        console.warn(err);
        return false;
    })
}

module.exports = {
    createUser,
    loginUser,
    getTimes,
    setCompleteTime,
    setStartTime,
    setStopTime,
    updateTimestamp,
    deleteTimestamp,
    count
}
