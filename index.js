const express = require('express')
const ping = require('ping')
const schedule = require('node-schedule')
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:');

db.serialize()

db.run("CREATE TABLE ping (" +
    "sqltime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, " +
    "latency REAL" +
")");

var insert_measurement = db.prepare("INSERT INTO ping(latency) VALUES (?)");

var j = schedule.scheduleJob('*/10 * * * * *', () => {
    ping.promise.probe('google.com')
    .then(x => {
        insert_measurement.run(x.time)
    })
  });


const app = express()

app.get('/pings', (req, res) => {
    db.all("SELECT * FROM ping", function(err, rows) {
        res.send(rows);
    });
    
})

app.listen(3000, () => console.log('App listening on port 3000!'))

