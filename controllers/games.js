const sha256 = require('js-sha256');
const SALT = 'Project 2, Lets go.';

module.exports = (db, cloudinary) => {

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

        if (picture) {
            picture.mv('public/dp/' + picture.name, (error) => {

                if (error) {
                    console.log("fail to move file");
                    response.status(500).render('error/error500');
                }

                let path = /dp/ + picture.name;

                cloudinary.v2.uploader.upload(`public/${path}`, (error, result) => {
                    db.games.uploadGames(request.body, result.url, request.cookies['userId'], (error, result) => {

                        if(error){
                            console.log("error in uploading: ", error.message);
                            response.status(500).render('error/error500');
                        }

                        response.redirect('/games/' + result);
                    });
                });
            });
        } else  {
            db.games.uploadGames(request.body, request.body.displayimage, request.cookies['userId'], (error, result) => {

                if(error){
                    console.log("error in uploading: ", error.message);
                    response.status(500).render('error/error500');
                }

                response.redirect('/games/' + result);
            });
        }
    };

    const display = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.games.selectedGame(request.params.id, (error, result, comments) => {

            if(error) {
                console.log("error in displaying game: ", error.message);
                response.status(500).render('error/error500');
            }
            response.cookie('currentPost', request.params.id);
            response.render('games/game', {cookie: cookie, currentPost: request.params.id, game: result, comments: comments});
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

        if (picture) {

            picture.mv('public/dp/' + picture.name, (error) => {

                if (error) {
                    console.log("fail to move file");
                    response.status(500).render('error/error500');
                }

                let path = /dp/ + picture.name;

                cloudinary.v2.uploader.upload(`public/${path}`, (error, result) => {
                    db.games.edit(request.body, result.url, request.params.id, (error) => {

                        if(error) {
                            console.log("error looking for values:", error.message);
                            response.status(500).render('error/error500');
                        }

                        response.redirect('/games/' + request.params.id);
                    });
                });
            });

        } else {
            db.games.edit(request.body, request.body.displayimage, request.params.id, (error) => {

                if(error) {
                    console.log("error looking for values:", error.message);
                    response.status(500).render('error/error500');
                }

                response.redirect('/games/' + request.params.id);
            });
        }
    };

    const comments = (request, response) => {

        db.games.comments(JSON.parse(request.body.comment), (error, result) => {

            if(error) {
                console.log("error in posting comments: ", error.message);
                response.status(500).render('error500');
            }

            response.send(result)
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