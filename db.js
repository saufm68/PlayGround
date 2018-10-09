const pg = require('pg');
const general = require('./models/general');

var configs = {

    user: 'saufi',
    host: '127.0.0.1',
    database: 'playground_db',
    port: 5432

};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {

    general: general(pool),
    //to close the server @ the end
    pool:pool

};