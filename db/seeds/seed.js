const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
          return db.query(`DROP TABLE IF EXISTS categories;`);
        });
      });
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
      slug VARCHAR(50) PRIMARY KEY NOT NULL,
      description TEXT
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY NOT NULL,
      avatar_url TEXT,
      name VARCHAR(50)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(50),
      review_body TEXT NOT NULL,
      designer VARCHAR(50),
      review_img_url TEXT DEFAULT E'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(50) NOT NULL,
      owner VARCHAR(50) NOT NULL,
      created_at DATE DEFAULT NOW(),
      FOREIGN KEY (category) REFERENCES categories(slug),
      FOREIGN KEY (owner) REFERENCES users(username)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(50) NOT NULL,
        review_id INT NOT NULL,
        votes INT DEFAULT 0,
        create_at DATE DEFAULT NOW(),
        body TEXT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(review_id),
        FOREIGN KEY (author) REFERENCES users(username)
      );`);
    });
  // 2. insert data
};

module.exports = seed;
