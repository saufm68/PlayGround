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
            db.games.uploadGameForm((error, result) => {

                if(error) {
                    console.log("error showing tags: ", error.message);
                    response.status(500).render('error/error500');
                }

                response.render('games/uploadForm', {cookie: cookie, tags: result});
            })
        } else {
            response.status(403).render('error/error403');
        }

    };

    const uploadGames = (request, response) => {

        let picture = request.files.displayimage;

        picture.mv('public/dp/' + picture.name, (error) => {

            if (error) {
                console.log("fail to move file");
                response.status(500).render('error/error500');
            }

            let path = /dp/ + picture.name;

            db.games.uploadGames(request.body, path, request.cookies['userId'], (error, result) => {

                if(error){
                    console.log("error in uploading: ", error.message);
                    response.status(500).render('error/error500');
                }

                response.redirect('/games/' + result);
            });
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
            response.cookie('currentPost', request.params.id);
            response.render('games/game', {cookie: cookie, currentPost: request.params.id, game: result});
        });

    };

    const commentsPage = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.games.commentsPage(request.params.id, (error, result) => {

            if(error) {
                console.log("error displaying comments: ", error.message);
                response.status(500).render('error/error500');
            }
            console.log(result);
            response.render('games/comments', {cookie: cookie, comments: result, currentPost: request.params.id});
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

        let picture = request.files.displayimage;

        picture.mv('public/dp/' + picture.name, (error) => {

            if (error) {
                console.log("fail to move file");
                response.status(500).render('error/error500');
            }

            let path = /dp/ + picture.name;

            db.games.edit(request.body, path, request.params.id, (error) => {

                if(error) {
                    console.log("error looking for values:", error.message);
                    response.status(500).render('error/error500');
                }

                response.redirect('/games/' + request.params.id);
            });

        });
    };

    const comments = (request, response) => {

        db.games.comments(request.body, (error) => {

            if(error) {
                console.log("error in posting comments: ", error.message);
                response.status(500).render('error500');
            }

            response.redirect(`/games/${request.params.id}/comments`)
        });
    };

    const play = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.games.play(request.params.id, (error, result) => {

            if(error) {
                console.log('error in rendering playPage: ', error.message);
                response.status(500).render('error/error500');
            }

            response.render('games/play', {link: result , cookie: cookie});
        });
    };

    const creator = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        response.render('games/create', {cookie: cookie});
    };

    const publish = (request, response) => {

        db.games.publish(JSON.parse(request.body.content), request.cookies['userId'], (error, result) => {

            if(error) {
                console.log('error in publishing into server: ', error.message);
                response.status(500).render('error/error500');
            }



            response.send({link:'/games/' + result});
        });
    };

    const playCreator = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };


        response.render('games/gameMakerPlay', {cookie:cookie});
    };

    const jsonPass = (request, response) => {

        db.games.playCreator(request.cookies['currentPost'], (error, result) => {

            if(error) {
                console.log('error getting creator game: ', error.message);
                response.status(500).render('error/error500');
            }


            response.send(result);
        });
    };

    const rating = (request, response) => {

        db.games.rating(parseInt(request.body.value), request.cookies['currentPost'], request.cookies['userId'], (error, result) => {

            if(error) {
                console.log('error rating game: ', error.message);
                response.status(500).render('error/error500');
            }

            response.send(result);
        });
    };

    return {
        uploadGameForm,
        uploadGames,
        display,
        commentsPage,
        comments,
        deletePost,
        editForm,
        edit,
        play,
        creator,
        publish,
        playCreator,
        jsonPass,
        rating

    };
};