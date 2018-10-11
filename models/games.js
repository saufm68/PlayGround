module.exports = (dbPool) => {

    const uploadGameForm = (callback) => {

        let text = `SELECT * FROM tags;`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };

    const uploadGames = (inputs, uploader, callback) => {

        const text = `INSERT INTO posts (title, summary, displayimage, link, author_id, dt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
        const values = [inputs.title, inputs.summary, inputs.displayimage, inputs.link, uploader, inputs.dt, inputs.rating];

        dbPool.query(text, values, (error, result) => {

            const resultId = result.rows[0];

            if (inputs.tag !== undefined) {

                if(Array.isArray(inputs.tag)) {

                    let text2 = `INSERT INTO tags_post (tag_id, post_id) VALUES `;

                    for(let i = 0; i < inputs.tag.length; i++) {
                        if(i === inputs.tag.length - 1) {
                            text2 += `(${inputs.tag[i]}, ${resultId.id});`;
                        } else {
                            text2 += `(${inputs.tag[i]}, ${resultId.id}), `;
                        }
                    }

                    dbPool.query(text2, (error, result) => {
                        callback(error, resultId.id);
                    });

                } else {
                    let text2 = `INSERT INTO tags_post (tag_id, post_id) VALUES (${inputs.tag}, ${resultId.id});`;

                    dbPool.query(text2, (error, result) => {
                        callback(error, resultId.id);
                    })
                }

            } else {

                callback(error, resultId.id);
            }
        });
    };

    const selectedGame = (currentPost, callback) => {

        let text = `SELECT tags.tag, tags.id FROM tags INNER JOIN tags_post ON (tags_post.tag_id = tags.id) WHERE tags_post.post_id='${currentPost}';`;

        dbPool.query(text, (error, result) => {

            if (error) {
                console.log("error looking for tag: ", error.message);
            }
            var tags = result.rows;

            let text2 = `SELECT COUNT(post_id) FROM ratings WHERE post_id='${currentPost}';`;

            dbPool.query(text2, (error, result) => {

                if(result.rows[0].count == 0 ) {
                    var rated = 0;
                    let text3 = `SELECT posts.*, users.username FROM posts INNER JOIN users ON (posts.author_id = users.id) WHERE posts.id='${currentPost}';`;

                    dbPool.query(text3, (error, result) => {
                        result.rows[0]['rated'] = rated;
                        result.rows[0]['tags'] = tags;
                        callback(error, result.rows[0]);
                    });

                } else {
                    var rated = result.rows[0].count;
                    let text3 = `SELECT AVG(rating) FROM ratings WHERE post_id='${currentPost}';`;

                    dbPool.query(text3, (error, result) => {
                        var rating = Math.floor(result.rows[0].avg);
                        let text4 = `UPDATE posts SET rating=${rating} WHERE id='${currentPost}';`;

                        dbPool.query(text4, (error, result) => {
                            let text5 = `SELECT posts.*, users.username FROM posts INNER JOIN users ON (posts.author_id = users.id) WHERE posts.id='${currentPost}';`;
                            dbPool.query(text4, (error, result) => {
                                result.rows[0]['rated'] = rated;
                                result.rows[0]['tags'] = tags;
                                callback(error, result.rows[0]);
                            });
                        });
                    });
                }
            });
        });
    };

    const commentsPage = (currentPost, callback) => {

        let text = `SELECT comments.*, posts.title, users.username FROM comments INNER JOIN posts ON (comments.post_id = posts.id) INNER JOIN users ON (comments.user_id = users.id) WHERE post_id='${currentPost}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };

    const deletePost = (currentPost, callback) => {

        let text = `DELETE FROM comments WHERE post_id='${currentPost}';`;
        let text2 = `DELETE FROM tags_post WHERE post_id='${currentPost}';`;
        let text3 = `DELETE FROM ratings WHERE post_id='${currentPost}';`;
        let text4 = `DELETE FROM posts WHERE id='${currentPost}';`;

        dbPool.query(text, (error, result)=> {

            dbPool.query(text2, (error, result)=> {

                dbPool.query(text3, (error, result)=> {

                    dbPool.query(text4, (error, result)=> {
                        callback(error);
                    });
                });
            });
        });
    };

    const editForm = (currentPost, callback) => {

        let text = `SELECT * FROM posts WHERE id='${currentPost}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows[0]);
        });
    };

    const edit = (input, currentPost, callback) => {

        let text = `UPDATE posts SET title=($1), summary=($2), link=($3), dt=($4), displayimage=($5) WHERE id='${currentPost}';`;
        let values = [input.title, input.summary, input.link, input.dt, input.displayimage];

        dbPool.query(text, values, (error, result) => {
            callback(error);
        });
    };

    const comments = (input, callback) => {

        let text = `INSERT INTO comments (message, post_id, user_id, dt) VALUES ($1, $2, $3, $4);`;

        let values = [input.message, input.post_id, input.user_id, input.dt];

        dbPool.query(text, values, (error, result) => {
            callback(error);
        });
    };

    return {
        uploadGameForm,
        uploadGames,
        selectedGame,
        commentsPage,
        comments,
        deletePost,
        editForm,
        edit
    };
};