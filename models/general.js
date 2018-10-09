const sha256 = require('js-sha256');

module.exports = (dbPool) => {

    const register = (input, callback) => {

        let text = `SELECT * FROM users WHERE username ='${input.username}';`;

        dbPool.query(text, (error, result) => {

            if(result.rows.length === 0) {

                let text2 = `INSERT INTO users (username, password, profilepic) VALUES ($1,$2,$3);`;
                let values = [input.username, sha256(input.password), '/dp/defaultpic.png'];

                dbPool.query(text2, values, (error, result) => {
                    callback(error);
                });
            } else {
                callback(error, result.rows[0].username);
            }
        });
    };

    const login = (input, callback) => {

        let text = `SELECT * FROM users WHERE username='${input.username}' AND password='${sha256(input.password)}';`;

        dbPool.query(text, (error, result) => {
            if(result.rows.length === 0) {
                console.log('if')
                callback(error);
            } else {
                console.log('else')
                callback(error, result.rows[0]);
            }
        });
    }

    return {
        register,
        login
    };
};