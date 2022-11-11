const { luhn_validate } = require("../utils/common.utils");

describe("Luhn Alogorithm Unit Tests", () => {
    test("should validate a correct card succesfully", function () {
        let card_check = luhn_validate(4228095308420585);
        expect(card_check).toBeTruthy()
    });

    it("should invalidate an incorrect card", function () {
        let card_check = luhn_validate(1000000000);
        expect(card_check).toBeFalsy();
    });
});
