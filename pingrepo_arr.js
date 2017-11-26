var pings = []

function store(val) {
    pings.push({
        timestamp : new Date(),
        latency: val
    })
}

function get_all() {
    return new Promise( (resolve, reject) => {
        resolve(pings);
    })
}

module.exports = {
    store : store,
    get_all : get_all
}