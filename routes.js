module.exports = (app,db, cloudinary) => {

    const general = require('./controllers/general')(db, cloudinary);
    const games = require('./controllers/games')(db, cloudinary);
    const users = require('./controllers/users')(db, cloudinary);

    /*=============================
    =          games              =
    =============================*/
    app.get('/games/new', games.uploadGameForm);
    app.post('/games', games.uploadGames);
    app.get('/game-maker/creator', games.creator);
    app.get('/game-maker/play/json', games.jsonPass);
    app.get('/game-maker/play/:id', games.playCreator);
    app.post('/game-maker', games.publish);
    app.post('/rating', games.rating);
    app.get('/play/:id', games.play);
    app.post('/comment', games.comments);
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

