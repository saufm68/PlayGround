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
                const cookie = {

                    check: sha256(SALT + result.username + 'loggedin'),
                    loginStatus: request.cookies['loginStatus'],
                    userId: request.cookies['userId'],
                    username: request.cookies['username']
                };

                response.cookie('loginStatus', sha256(SALT + result.username + 'loggedin'));
                response.cookie('userId', result.id);
                response.cookie('username', result.username);
                response.redirect('/');

            } else {
                response.render('general/login', {check: 'true'});
            }
        });

    };

    return {
        registerForm,
        register,
        loginForm,
        login
    }
};