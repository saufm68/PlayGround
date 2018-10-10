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
                callback(error);
            } else {
                callback(error, result.rows[0]);
            }
        });
    };

    const homepage = (callback) => {

        let text = `SELECT * FROM posts WHERE author_id='1';`;

        dbPool.query(text, (error, result) => {

            var games = {};
            games['pro'] = result.rows;

            let text2 = `SELECT * FROM posts WHERE author_id!='1';`;

            dbPool.query(text, (error, result) => {

                games['amateur'] = result.rows;

                callback(error, games);
            });

        });
    };

    const searchProNameRating = (searchby, value, callback) => {
        let text = `SELECT * FROM posts WHERE ${searchby}='${value}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };

    const searchAmateur = (searchby, value, callback) => {
        let text = `SELECT * FROM posts WHERE ${searchby}!='${value}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };


    const searchTags = (value, callback) => {

        let text = `SELECT posts.* FROM posts INNER JOIN tags ON (tags.post_id = posts.id) WHERE tags.tag='${value}';`;

        dbPool.query(text, (error, result) => {

            callback(error, result.rows);
        });
    };

    return {
        register,
        login,
        homepage,
        searchProNameRating,
        searchAmateur,
        searchTags
    };
};