const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../server-items/app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("getCategories() GET /api/categories", () => {
  test("getCategories responds with status 200 and returns an object of arrays of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
      });
  });
  test("getCategories returns correct object keys and values", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(response.body[0].description).toBe(
          "Abstact games that involve little luck"
        );
        expect(response.body[0].slug).toBe("euro game");
        response.body.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  /*   test("getCategories ERROR responds with status 404 when incorrect endpoint given", () => {
    return request(app)
      .get("/api/9")
      .expect(400)
      .then((response) => {
        //    console.log(response.text);
        expect(response.text).toBe("Bad request! Invalid input type.");
      });
  }); */
});

describe("getReviewsByID() GET /api/reviews/:review_id", () => {
  test("getReviewsByID() returns a 200 status and a review object", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("getReviewsByID() returns correct object keys and values, including comment_count key", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then((response) => {
        const result = response.body;
        expect(result).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(Number),
          })
        );
        expect(result.title).toBe("Ultimate Werewolf");
        expect(result.designer).toBe("Akihisa Okui");
        expect(result.owner).toBe("bainesface");
        expect(result.votes).toBe(5);
        expect(result.comment_count).toBe(3);
      });
  });
  test("getReviewsByID() ERROR returns a 404 status and error message when review_id doesn't exist", () => {
    return request(app)
      .get("/api/reviews/50")
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("No review found for with review_id: 50");
      });
  });

  describe("patchReviewVotes() PATCH /api/reviews/:review_id", () => {
    test("patchReviewVotes() returns a 200 status with the review item", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 9 })
        .expect(200)
        .then((response) => {
          expect(typeof response.body).toBe("object");
        });
    });
    test("patchReviewVotes() returns a 200 status with the review item updated", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({ inc_votes: -20 })
        .expect(200)
        .then((response) => {
          expect(response.body.votes).toBe(-19);
        });
    });
    test("patchReviewVotes() ERROR returns a 404 status and error message when review_id doesn't exist", () => {
      return request(app)
        .patch("/api/reviews/50")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ text }) => {
          expect(text).toBe("No review found for with review_id: 50");
        });
    });
  });
  describe("getReviews() GET /api/reviews", () => {
    test("returns a 200 status, and an array of all reviews", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBe(13);
        });
    });
    test("results returned on get request includes a comment_count key and value, also all other keys", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          expect(response.body[0].comment_count).toBe("0");
          expect(response.body[1]).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              category: expect.any(String),
              owner: expect.any(String),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
    });
    test("returns the filtered results based on defaults", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("returns the filtered results based on query input for sort_by and order", () => {
      return request(app)
        .get("/api/reviews/?sort_by=category&order=ASC")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body).toBeSortedBy("category", { ascending: true });
        });
    });
    test("returns the filtered results based on query input for category", () => {
      return request(app)
        .get("/api/reviews/?category=dexterity")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          const body = response.body;
          body.forEach((res) => {
            expect(res.category).toBe("dexterity");
          });
        });
    });
    test("returns the filtered results based on query input for category with a space", () => {
      return request(app)
        .get("/api/reviews/?category=euro_game")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          const body = response.body;
          body.forEach((res) => {
            expect(res.category).toBe("euro game");
          });
        });
    });
    describe("getCommentsByReview() GET /api/reviews/:review_id/comments", () => {
      test("returns an array of comments with the inputted review_id", () => {
        return request(app)
          .get("/api/reviews/2/comments")
          .expect(200)
          .then((response) => {
            response.body.forEach((comment) => {
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              });
            });
          });
      });
    });
  });

  describe("postCommentsByReview() POST /api/reviews/:review_id/comments", () => {
    test("sends a username and body object review to be posted, and responds with it", () => {
      return request(app)
        .post("/api/reviews/2")
        .send({ username: "dav3rid", comment: "That slaysss!" })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              created_at: expect.any(String),
              author: "dav3rid",
              body: "That slaysss!",
              votes: 0,
              review_id: 2,
            })
          );
        });
    });
    test("postCommentByReview() ERROR returns a 404 status and error message when review_id doesn't exist", () => {
      return request(app)
        .post("/api/reviews/40")
        .send({ username: "dav3rid", comment: "That slaysss!" })
        .expect(400)
        .then(({ text }) => {
          console.log(text);
          expect(text).toBe("Invalid input!");
        });
    });
  });

  describe("deleteCommentsByID() DELETE /api/comments/:comment_id", () => {
    test("deletes the required comment and returns a message to confirm this", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then((response) => {
          return db
            .query(`SELECT * FROM comments WHERE comment_id = 1;`)
            .then((result) => {
              const resultsArr = result.rows;
              expect(resultsArr.length).toBe(0);
            });
        });
    });
  });

  describe("getEndpoints() GET /api", () => {
    test("returns a JSON object of endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
        });
    });
    /*     test("returns a 404 error when path incorrect", () => {
      return request(app)
        .get("/ap")
        .expect(404)
        .then((response) => {
          console.log(response.text);
          expect(response.body).toBe("Not a valid request! Input incorrect.");
        });
    }); */
  });
});
