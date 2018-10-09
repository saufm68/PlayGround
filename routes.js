module.exports = (app,db) => {

    const general = require('./controllers/general')(db);

    /*=============================
    =          games              =
    =============================*/
    //app.get('games/:id', games.display)

    /*=============================
    =          users              =
    =============================*/

    /*=============================
    =          general            =
    =============================*/
    app.get('/register', general.registerForm);
    app.post('/register', general.register);
    app.get('/login', general.loginForm);
    app.post('/login', general.login);
    app.get('/search', general.search);
    app.get('/', general.homepage);

};