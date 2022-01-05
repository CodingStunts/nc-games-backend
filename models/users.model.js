const db = require("../db/connection");

exports.selectUsers = (queryData) => {
  return db.query(`SELECT username FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByID = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Username doesn't exist!",
        });
      }
      return rows;
    });
};
