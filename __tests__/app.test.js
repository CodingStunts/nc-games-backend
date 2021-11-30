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
describe("getReviews() GET /api/reviews/:review_id", () => {
  test("getReviews() returns a 200 status and a review object", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("getReviews() returns correct object keys and values", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then((response) => {
        const result = response.body[0];
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
          })
        );
        expect(result.title).toBe("Ultimate Werewolf");
        expect(result.designer).toBe("Akihisa Okui");
        expect(result.owner).toBe("bainesface");
        expect(result.votes).toBe(5);
      });
  });
});
