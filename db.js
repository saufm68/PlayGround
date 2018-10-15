const pg = require('pg');
const general = require('./models/general');
const games = require('./models/games');
const users = require('./models/users');

const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

    //we need to take apart the url so we can set the appropriate configs
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    //make the configs object
    var configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

}else{

    var configs = {
        user: 'saufi',
        host: '127.0.0.1',
        database: 'playground_db',
        port: 5432
    };

}

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {

    general: general(pool),
    games: games(pool),
    users: users(pool),
    //to close the server @ the end
    pool:pool

};