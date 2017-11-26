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

app.get('/pings', (req, res) => {
    repo.get_all().then(rows => res.send(rows))
})

app.listen(3000, () => console.log('App listening on port 3000!'))

