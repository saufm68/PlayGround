module.exports = (dbPool) => {

    const uploadGames = (inputs, uploader, callback) => {

        const text = `INSERT INTO posts (title, summary, displayimage, link, author_id, dt, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
        const values = [inputs.title, inputs.summary, inputs.displayimage, inputs.link, uploader, inputs.dt, inputs.rating];

        dbPool.query(text, values, (error, result) => {

            const resultId = result.rows[0];

            if (inputs.tags !== '') {

                let text2 = `INSERT INTO tags (tag, post_id) VALUES `;
                let values = [];
                let tags = inputs.tags.split('.');
                let filteredTags = tags.filter((element) => {
                    return element != '';
                });
                for (let i = 1; i <= filteredTags.length; i++) {
                     if(i = (filteredTags.length -1)) {
                        text2 += `($${i}, ${resultId}), `;
                     } else {
                        text2 += `($${i}, ${resultId});`;
                     }
                     values.push(filteredTags[i - 1]);
                }

                dbPool.query(text, values, (error, result) => {
                    callback(error, resultId);
                });
            } else {
                callback(error, resultId);
            }
        });
    };

    const selectedGame = (currentPost, callback) => {

        let text = `SELECT tags.tag, tags.id FROM tags WHERE post_id='${currentPost}';`;

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

    const comments = (currentPost, callback) => {

        let text = `SELECT comments.*, posts.title, users.username FROM comments INNER JOIN posts ON (comments.post_id = posts.id) INNER JOIN users ON (comments.user_id = users.id) WHERE post_id='${currentPost}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };

    const deletePost = (currentPost, callback) => {

        let text = `DELETE FROM comments WHERE post_id='${currentPost}';`;
        let text2 = `DELETE FROM tags WHERE post_id='${currentPost}';`;
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

    return {
        uploadGames,
        selectedGame,
        comments,
        deletePost,
        editForm,
        edit
    };
};