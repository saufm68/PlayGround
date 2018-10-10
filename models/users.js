module.exports = (dbPool) => {

    const showProfile = (id, callback) => {
        let text = `SELECT * FROM users WHERE id='${id}';`;

        dbPool.query(text, (error, result) => {

            profile = result.rows[0];

            let text2 = `SELECT posts.id, posts.displayimage FROM posts WHERE author_id='${id}';`;

            dbPool.query(text2, (error, result) => {
                profile['list'] = result.rows;
                callback(error, profile);
            });
        });
    };

    const deleteAccount = (id, callback) => {

        let text = `DELETE`

    };

    return {
        showProfile,
        deleteAccount
    };
};