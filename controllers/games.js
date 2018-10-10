const sha256 = require('js-sha256');
const SALT = 'Project 2, Lets go.';

module.exports = (db) => {

    const uploadGameForm = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        if (cookie.loginStatus === cookie.check && sha256(SALT + request.cookies['username'] + 'loggedin') === cookie.check) {
            response.render('games/uploadForm', {cookie: cookie});
        } else {
            response.status(403).render('error/error403');
        }

    };

    const uploadGames = (request, response) => {

        db.games.uploadGames(request.body, request.cookies['userId'], (error, result) => {

            if(error){
                console.log("error in uploading: ", error.message);
                response.status(500).render('error/error500');
            }

            response.redirect('/games/' + result);
        });
    };

    const display = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.games.selectedGame(request.params.id, (error, result) => {

            if(error) {
                console.log("error in displaying game: ", error.message);
                response.status(500).render('error/error500');
            }

            response.render('games/game', {cookie: cookie, currentPost: request.params.id, game: result});
        });

    };

    const comments = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.games.comments(request.params.id, (error, result) => {

            if(error) {
                console.log("error displaying comments: ", error.message);
                response.status(500).render('error/error500');
            }

            response.render('games/comments', {cookie: cookie, comments: result});
        });
    };

    const deletePost = (request, response) => {

        db.games.deletePost(request.params.id, (error) => {

            if (error) {
                console.log('error on deleting post: ', console.log(error));
                response.status(500).render('error/error500');
            }

            response.redirect('/');
        });
    };

    const editForm = (request, response) => {

        db.games.editForm(request.params.id, (error, result) => {

            const cookie = {

                check: sha256(SALT + request.cookies['username'] + 'loggedin'),
                loginStatus: request.cookies['loginStatus'],
                userId: request.cookies['userId'],
                username: request.cookies['username']
            };

            if(error) {
                console.log("error looking for values:", error.message);
                response.status(500).render('error/error500');
            }

            response.render('games/editForm', {cookie: cookie, post: result, currentPost: request.params.id});
        });

    };

    const edit = (request, response) => {

        db.games.edit(request.body, request.params.id, (error) => {

            if(error) {
                console.log("error looking for values:", error.message);
                response.status(500).render('error/error500');
            }

            response.redirect('/games/' + request.params.id);
        });
    };

    return {
        uploadGameForm,
        uploadGames,
        display,
        comments,
        deletePost,
        editForm,
        edit
    };
};