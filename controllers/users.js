const sha256 = require('js-sha256');
const SALT = 'Project 2, Lets go.';

module.exports = (db) => {

    const showProfile = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.users.showProfile(request.params.id, (error, result) => {

            if(error){
                console.log("error in displaying profile:", error.message);
                response.status(500).render('error/error500');
            }

            response.render('users/user', {cookie: cookie, user: result});
        });
    };

    const deleteAccount = (request, response) => {

        db.users.deleteAccount(request.params.id, (error) => {

            response.clearCookie('loginStatus');
            response.clearCookie('userId');
            response.clearCookie('username');

            if(error) {
                console.log("error in deleting account: ", error.message);
                response.status(500).render('error/error500');
            };

            response.redirect('/');
        });
    };

    const editForm = (request, response) => {

        const cookie = {

            check: sha256(SALT + request.cookies['username'] + 'loggedin'),
            loginStatus: request.cookies['loginStatus'],
            userId: request.cookies['userId'],
            username: request.cookies['username']
        };

        db.users.editForm(request.params.id, (error, result) => {

            if(error) {
                console.log("error getting previous values: ", error.message);
                response.status(500).render('error/error500');
            }

            response.render('users/editForm', {cookie: cookie, user: result});
        });
    };

    const edit = (request, response) => {

        db.users.edit(request.body, request.params.id, (error) => {

            if(error) {
                console.log("error in editing: ", error.message);
                response.status(500).render('error/error500');
            }

            response.redirect('/users/' + request.params.id);
        });
    };

    return{
        showProfile,
        deleteAccount,
        editForm,
        edit
    };
};