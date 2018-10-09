module.exports = (app,db) => {

    const general = require('./controllers/general')(db);

    /*=============================
    =          general            =
    =============================*/
    app.get('/register', general.registerForm);
    app.post('/register', general.register);
    app.get('/login', general.loginForm);
    app.post('/login', general.login);
    app.get('/', general.homepage);

};