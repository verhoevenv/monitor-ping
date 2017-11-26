const express = require('express')
const ping = require('ping')
const schedule = require('node-schedule')

const repo = require('./pingrepo_arr.js')

var j = schedule.scheduleJob('*/10 * * * * *', () => {
    ping.promise.probe('google.com')
    .then(x => {
        repo.store(x.time)
    })
  });


const app = express()

app.use(express.static('static'))

app.get('/ping', (req, res) => {
    repo.get_all().then(rows => {
        res.send(rows.map(row => ({x: row.timestamp, y: row.latency})))
    })
})


app.listen(3000, () => console.log('App listening on port 3000!'))

