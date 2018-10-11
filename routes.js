module.exports = (app,db) => {

    const general = require('./controllers/general')(db);
    const games = require('./controllers/games')(db);
    const users = require('./controllers/users')(db);

    /*=============================
    =          games              =
    =============================*/
    app.get('/games/new', games.uploadGameForm);
    app.post('/games', games.uploadGames);
    app.get('/games/:id/comments', games.commentsPage);
    app.post('/games/:id/comments', games.comments);
    app.get('/games/:id/edit', games.editForm);
    app.put('/games/:id', games.edit);
    app.delete('/games/:id', games.deletePost);
    app.get('/games/:id', games.display);

    /*=============================
    =          users              =
    =============================*/
    app.get('/users/:id/edit', users.editForm);
    app.put('/users/:id', users.edit);
    app.delete('/users/:id', users.deleteAccount);
    app.get('/users/:id', users.showProfile);

    /*=============================
    =          general            =
    =============================*/
    app.get('/register', general.registerForm);
    app.post('/register', general.register);
    app.get('/login', general.loginForm);
    app.post('/login', general.login);
    app.post('/logout', general.logout);
    app.get('/search', general.search);
    app.get('/', general.homepage);

};