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
  test("results returned on get request includes a comment_count key and value", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        expect(response.body[0].comment_count).toBe("0");
      });
  });
  test("returns the filtered results based on query input", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then((response) => {
        response;
      });
  });
});
