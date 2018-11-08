module.exports = (dbPool) => {

    const uploadGameForm = (callback) => {

        let text = `SELECT * FROM tags;`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows);
        });
    };

    const uploadGames = (inputs, image, uploader, callback) => {

        const text = `INSERT INTO posts (title, summary, displayimage, link, author_id, dt, rating, pro,  gamemaker) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

        if (inputs.category === 'pro') {
            var pro = true;
        } else {
            var pro = false;
        }

        const values = [inputs.title, inputs.summary, image, inputs.link, uploader, inputs.dt, inputs.rating, pro, false];

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

            let text2 = `SELECT comments.*, users.username FROM comments INNER JOIN posts ON (comments.post_id = posts.id) INNER JOIN users ON (comments.user_id = users.id) WHERE post_id='${currentPost}' ORDER BY dt DESC;`;

            dbPool.query(text2, (error, result) => {

                let comments = result.rows;

                let text3 = `SELECT COUNT(post_id) FROM ratings WHERE post_id='${currentPost}';`;

                dbPool.query(text3, (error, result) => {

                    if(result.rows[0].count == 0 ) {
                        var rated = 0;
                        let text4 = `SELECT posts.*, users.username FROM posts INNER JOIN users ON (posts.author_id = users.id) WHERE posts.id='${currentPost}';`;

                        dbPool.query(text4, (error, result) => {
                            result.rows[0]['rated'] = rated;
                            result.rows[0]['tags'] = tags;
                            callback(error, result.rows[0], comments);
                        });

                    } else {
                        var rated = result.rows[0].count;
                        let text4 = `SELECT AVG(rating) FROM ratings WHERE post_id='${currentPost}';`;

                        dbPool.query(text4, (error, result) => {
                            var rating = Math.floor(result.rows[0].avg);
                            let text5 = `UPDATE posts SET rating=${rating} WHERE id='${currentPost}';`;

                            dbPool.query(text5, (error, result) => {
                                let text6 = `SELECT posts.*, users.username FROM posts INNER JOIN users ON (posts.author_id = users.id) WHERE posts.id='${currentPost}';`;
                                dbPool.query(text6, (error, result) => {
                                    result.rows[0]['rated'] = rated;
                                    result.rows[0]['tags'] = tags;
                                    callback(error, result.rows[0], comments);
                                });
                            });
                        });
                    }
                });
            });
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

    const edit = (input, image, currentPost, callback) => {

        let text = `UPDATE posts SET title=($1), summary=($2), link=($3), dt=($4), displayimage=($5) WHERE id='${currentPost}';`;
        let values = [input.title, input.summary, input.link, input.dt, image];

        dbPool.query(text, values, (error, result) => {
            callback(error);
        });
    };

    const comments = (input, callback) => {

        let text = `INSERT INTO comments (message, post_id, user_id, dt_simplified, dt) VALUES ($1, $2, $3, $4, $5) RETURNING message, post_id, user_id, dt_simplified, dt;`;
        let date = new Date();
        let dt_simplified = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
        let values = [input.message, input.post_id, input.user_id, dt_simplified, date];

        dbPool.query(text, values, (error, result) => {
            let comments = result.rows[0];
            let text2 = `SELECT users.username FROM users WHERE id = '${comments.user_id}';`;

            dbPool.query(text2, (error, result) => {
                comments.username = result.rows[0].username;
                callback(error, comments);
            })
        });
    };

    const play = (gameId, callback) => {

        let text = `SELECT * FROM posts WHERE id='${gameId}';`;
        dbPool.query(text, (error, result) => {
            callback(error, result.rows[0].link);
        });
    };

    const publish = (inputs, uploader, callback) => {

        let text = `INSERT INTO posts (title, summary, displayimage, link, author_id, dt, rating, gamemaker, map, player_function, enemy_function) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;`;

        let values = [inputs.title, inputs.summary, inputs.dp, inputs.link, uploader, inputs.dt, inputs.rating, true, JSON.stringify(inputs.map), inputs.player_function, inputs.enemy_function];

        dbPool.query(text, values, (error, result) => {
            callback(error, result.rows[0].id);
        });
    };

    const playCreator = (currentPost, callback) => {

        let text = `SELECT * FROM posts WHERE id='${currentPost}';`;

        dbPool.query(text, (error, result) => {
            callback(error, result.rows[0]);
        });
    };

    const rating = (rating, currentPost, currentUser, callback) => {

        var passedResult = {};
        let text = `INSERT INTO ratings (rating, post_id, user_id) VALUES ($1, $2, $3);`;

        let values = [rating, currentPost, currentUser];

        dbPool.query(text, values, (error, result) => {

            let text2 = `SELECT COUNT(post_id) FROM ratings WHERE post_id='${currentPost}';`;

            dbPool.query(text2, (error, result) => {
                passedResult['count'] = result.rows[0].count;

                let text3 = `SELECT AVG(rating) FROM ratings WHERE post_id='${currentPost}';`;

                dbPool.query(text3, (error, result) => {
                    passedResult['avg'] = Math.floor(result.rows[0].avg);

                    let text4 = `UPDATE posts SET rating=${passedResult['avg']} WHERE id='${currentPost}';`;

                    dbPool.query(text4, (error) => {
                        callback(error, passedResult);
                    });
                });
            });
        });
    };

    return {
        uploadGameForm,
        uploadGames,
        selectedGame,
        comments,
        deletePost,
        editForm,
        edit,
        play,
        publish,
        playCreator,
        rating
    };
};