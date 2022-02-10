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
      username VARCHAR(100) PRIMARY KEY NOT NULL,
      avatar_url TEXT,
      name VARCHAR(50)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(100),
      review_body TEXT NOT NULL,
      designer VARCHAR(100),
      review_img_url TEXT DEFAULT E'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(100) NOT NULL,
      owner VARCHAR(50) NOT NULL,
      created_at DATE DEFAULT NOW(),
      FOREIGN KEY (category) REFERENCES categories(slug),
      FOREIGN KEY (owner) REFERENCES users(username)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(100) NOT NULL,
        review_id INT,
        votes INT DEFAULT 0,
        created_at DATE DEFAULT NOW(),
        body TEXT NOT NULL,
        FOREIGN KEY (review_id) REFERENCES reviews(review_id),
        FOREIGN KEY (author) REFERENCES users(username)
      );`);
    })
    .then(() => {
      const formattedCategoryData = categoryData.map((category) => {
        return [category.slug, category.description];
      });
      const queryString = format(
        `INSERT INTO categories
        (slug, description)
        VALUES
        %L
        RETURNING *;`,
        formattedCategoryData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedUserData = userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
      });
      const queryString = format(
        `INSERT INTO users
        (username, avatar_url, name)
        VALUES
        %L
        RETURNING *;`,
        formattedUserData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedReviewData = reviewData.map((review) => {
        return [
          review.title,
          review.review_body,
          review.designer,
          review.review_img_url,
          review.votes,
          review.category,
          review.owner,
          review.created_at,
        ];
      });
      const queryString = format(
        `INSERT INTO reviews
        (title, review_body, designer, review_img_url, votes, category, owner, created_at)
        VALUES
        %L
        RETURNING *;`,
        formattedReviewData
      );
      return db.query(queryString);
    })
    .then(() => {
      const formattedCommentData = commentData.map((comment) => {
        return [
          comment.author,
          comment.review_id,
          comment.votes,
          comment.created_at,
          comment.body,
        ];
      });
      const queryString = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES
        %L
        RETURNING *;`,
        formattedCommentData
      );
      return db.query(queryString);
    });
};

module.exports = seed;
