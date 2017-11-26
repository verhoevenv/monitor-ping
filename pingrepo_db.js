const sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:');

db.serialize()

db.run("CREATE TABLE ping (" +
    "timestamp STRING, " +
    "latency REAL" +
")");

function store(val) {
    db.prepare("INSERT INTO ping(timestamp, latency) VALUES (?, ?)").run(new Date(), val);
}

function readAll() {
    return new Promise( (resolve, reject) => {
        db.all("SELECT * FROM ping", function(err, rows) {
            if(err) {
                reject(err);
            } else {
                for(let row of rows) {
                    row.timestamp = new Date(row.timestamp);
                }
                resolve(rows);
            }
        })});
}

module.exports = {
    store : store,
    get_all : readAll
}