const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const db = require('./db');

//Initialize express app
const app = express();

//Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

//Set up file-upload
app.use(fileUpload());
//To allow to link to public folder
app.use(express.static('public'));

//Set react-views to be the default view-engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


//Import Routes
require('./routes')(app, db);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

 const PORT = 3000;

 const server = app.listen(PORT, () => console.log("~~ PlayGround running ~~"))

//Run clean up actions when server shuts down
server.on('close', () => {
    console.log("closing server");

    db.pool.end(() => {
        console.log('Shut down database connection');
    });
});



