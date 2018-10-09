const sha256 = require('js-sha256');
const SALT = 'Project 2, Lets go.';



module.exports = (db) => {

    const registerForm = (request, response) => {

        response.render('general/register');
    };

    const register = (request, response) => {

        db.general.register(request.body, (error, result) => {

            if (error) {
                console.log("error in registering:", error.message);
                response.status(500).render('error/error500');
            }

            if(!result) {
                response.redirect('/login');
            } else{
                response.render('general/register', {check: 'true'});
            }

        });
    };

    const loginForm = (request, response) => {
        response.render('general/login');
    }

    const login = (request, response) => {

        db.general.login(request.body, (error, result) => {

            if(error) {
                console.log("error logging in: ", error.message);
                response.status(500).render('error500');
            }

            if (result) {

                response.cookie('loginStatus', sha256(SALT + result.username + 'loggedin'));
                response.cookie('userId', result.id);
                response.cookie('username', result.username);
                response.redirect('/');

            } else {
                response.render('general/login', {check: 'true'});
            }
        });

    };

    const homepage = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.general.homepage((error, result) => {

            if(error) {
                console.log("error displaying homepage: ", error.message);
                response.status(500).render('error/error500');
            }

            response.render('general/home', {pro: result.pro, amateur: result.amateur, cookie: cookie});
        });
    };

    const search = (request,response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        const searchDb = (show, searchby, value) => {

            db.general.searchProNameRating(searchby, value, (error, result) => {

                if(error) {
                    console.log("error in searching", error.message);
                    response.status(500).render('error/error500');
                }

                response.render('general/search', {show: show, result: result, cookie: cookie});
            });

        };

        if(request.query.topic === 'tags') {

            db.general.searchTags(request.query.show, (error, result) => {

                if(error) {
                    console.log("error in searching tag: ", error.message);
                    response.status(500).render('error/error500');
                }

                response.render('general/search', {show: `${request.query.show} Games`, result: result, cookie: cookie});
            });

        } else if(request.query.topic === 'name') {

            searchDb(request.query.show,'title', request.query.show);

        } else if(request.query.topic === 'rating') {

            searchDb(`Games With Rating = ${request.query.show}`,'rating', request.query.show);

        } else {

            if(request.query.show === 'pro') {

                searchDb(`Professional Games`,'author_id', 1);

            } else if(request.query.show === 'amateur') {

                db.general.searchAmateur('author_id', 1, (error, result) => {

                    if(error) {
                        console.log("error in searching", error.message);
                        response.status(500).render('error/error500');
                    }

                    response.render('general/search', {show: `Amateur Games`, result: result, cookie: cookie});
                });

            } else {
                response.status(404).render('error/error404');
            }

        }

    };

    return {
        registerForm,
        register,
        loginForm,
        login,
        homepage,
        search
    }
};