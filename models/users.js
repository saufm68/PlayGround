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

        var deletedPostId = [];
        let text = `DELETE FROM users WHERE id='${id}';`;

        dbPool.query(text, (error, result) => {

            let text2 = `DELETE FROM posts WHERE author_id='${id}' RETURNING id;`;

            dbPool.query(text2, (error, result) => {

                if (result.rows.length > 0) {
                    result.rows.forEach((element) => {
                        deletedPostId.push(element.id);
                    });
                }

                let text3 = `DELETE FROM comments WHERE user_id='${id}'`;

                    for (let i = 0; i < deletedPostId.length; i++) {
                    if(i === deletedPostId.length - 1) {
                        text3 += ` OR post_id='${deletedPostId[i]}';`;
                    } else {
                        text3 += ` OR post_id='${deletedPostId[i]}'`;
                    }
                };

                dbPool.query(text3, (error, result) => {

                    let text4 = `DELETE FROM ratings WHERE user_id='${id}'`;

                    for (let i = 0; i < deletedPostId.length; i++) {
                        if(i === deletedPostId.length - 1) {
                            text4 += ` OR post_id='${deletedPostId[i]}';`;
                        } else {
                            text4 += ` OR post_id='${deletedPostId[i]}'`;
                        }
                    }

                    if(deletedPostId.length > 0) {

                        dbPool.query(text4, (error, result) => {

                            let text5 = `DELETE FROM tags_post WHERE post_id='${deletedPostId[0]}'`;

                            for (let i = 1; i < deletedPostId.length; i++) {

                                if(i === deletedPostId.length - 1) {
                                    text5 += ` OR post_id='${deletedPostId[i]}';`;
                                } else {
                                    text5 += ` OR post_id='${deletedPostId[i]}'`;
                                }
                            }

                            dbPool.query(text5, (error, result) => {
                                callback(error);
                            });
                        });
                    } else {
                        callback(error);
                    }
                });
            });
        });
    };

    const editForm = (id, callback) => {

        let text = `SELECT * FROM users WHERE id='${id}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows[0]);
        });
    };

    const edit = (input, path, id, callback) => {

        let text = `UPDATE users SET profilepic=($1), age=($2), biography=($3) WHERE id='${id}';`;

        let values = [path, input.age, input.biography];

        dbPool.query(text, values, (error, result) => {
            callback(error);
        });
    };

    return {
        showProfile,
        deleteAccount,
        editForm,
        edit
    };
};