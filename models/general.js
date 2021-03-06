const sha256 = require("js-sha256");

module.exports = dbPool => {
  const register = (input, callback) => {
    let text = `SELECT * FROM users WHERE username ='${input.username}';`;

    dbPool.query(text, (error, result) => {
      if (result.rows.length === 0) {
        let text2 = `INSERT INTO users (username, age, password, profilepic, biography) VALUES ($1,$2,$3,$4,$5) RETURNING id, username;`;
        let values = [
          input.username,
          input.age,
          sha256(input.password),
          "/dp/defaultpic.png",
          ""
        ];

        dbPool.query(text2, values, (error, result) => {
          callback(error, result.rows[0]);
        });
      } else {
        var check = true;
        callback(error, result.rows[0].username, check);
      }
    });
  };

  const login = (input, callback) => {
    let text = `SELECT * FROM users WHERE username='${
      input.username
    }' AND password='${sha256(input.password)}';`;

    dbPool.query(text, (error, result) => {
      if (result.rows.length === 0) {
        callback(error);
      } else {
        callback(error, result.rows[0]);
      }
    });
  };

  const homepage = callback => {
    let text = `SELECT * FROM posts;`;

    dbPool.query(text, (error, result) => {
      var games = {
        amateur: [],
        gamemaker: [],
        leaderboard: []
      };

      result.rows.filter(element => {
        if (element.gamemaker === true) {
          return games.gamemaker.push(element);
        } else {
          return games.amateur.push(element);
        }
      });

      function addLeaderboard(array) {
        let check = 0;
        let leadGame = null;
        if (array.length > 0) {
          array.forEach(element => {
            if (element.rating >= check) {
              check = element.rating;
              leadGame = element;
            }
            if (array.indexOf(element) === array.length - 1) {
              games.leaderboard.push(leadGame);
            }
          });
        }
      }

      addLeaderboard(games.amateur);
      addLeaderboard(games.gamemaker);

      callback(error, games);
    });
  };

  const searchAmatuerNameGamemaker = (searchby, value, callback) => {
    let text = `SELECT * FROM posts WHERE ${searchby}='${value}';`;

    dbPool.query(text, (error, result) => {
      callback(error, result.rows);
    });
  };

  // const searchAmateur = (searchby, value, callback) => {
  //   let text = `SELECT * FROM posts WHERE ${searchby}!='${value}';`;

  //   dbPool.query(text, (error, result) => {
  //     callback(error, result.rows);
  //   });
  // };

  const searchTags = (value, callback) => {
    let text = `SELECT posts.* FROM posts INNER JOIN tags_post ON (tags_post.post_id = posts.id) INNER JOIN tags ON (tags_post.tag_id = tags.id) WHERE tags.tag='${value}';`;

    dbPool.query(text, (error, result) => {
      callback(error, result.rows);
    });
  };

  return {
    register,
    login,
    homepage,
    searchAmatuerNameGamemaker,
    // searchAmateur,
    searchTags
  };
};
