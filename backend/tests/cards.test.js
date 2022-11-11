const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("Card Integration Tests", () => {
    it("should create a card succesfully", function (done) {
        void request
            .post("/api/cards")
            .send({
                "name": "John Does",
                "card_no": 4228095308420585,
                "limit": 3000
            })
            .expect(201)
            .end(function (err, _) {
                if (err) return done(err);
                done();
            });
    });
    it("should throw error on an invalid card", function (done) {
        void request
            .post("/api/cards")
            .send({
                "name": "John Does",
                "card_no": 100000000000000000,
                "limit": 3000
            })
            .expect(422)
            .end(function (err, _) {
                if (err) return done(err);
                done();
            });
    });

    it("should return a list of cards objects", function (done) {
        void request
            .get("/api/cards")
            .expect(200)
            .end(function (err, res) {
                expect(res.body.length).toEqual(1);
                expect(res.body[0]).toHaveProperty("name");
                expect(res.body[0]).toHaveProperty("card_no");
                expect(res.body[0]).toHaveProperty("limit");
                if (err) return done(err);
                done();
            });
    });

    it("should test invalid endpoints", function (done) {
        void request
            .get("/api/wrong-endpoint")
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    
});
