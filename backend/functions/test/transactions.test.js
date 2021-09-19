const assert = require("assert");
const td = require("testdouble");

let transactionDatabase, transactionController;
const mockResponseOK = "OK";
const mockPayload = {
  cart: [
    {
      id: "abc",
      amount: 1,
      data: {},
    },
  ],
  totalPrice: 123,
};

describe("Transactions", () => {
  beforeEach(() => {
    transactionDatabase = td.replace("../database/transactions");
    td.when(transactionDatabase.postTransaction(mockPayload)).thenResolve(
      mockResponseOK
    );
    transactionController = require("../controllers/transactions");
  });

  afterEach(() => {
    td.reset();
  });

  describe("#post a transaction", () => {
    it("should return OK", async () => {
      const spy = td.function("spy");

      const res = {
        send: spy,
      };

      const req = {
        body: mockPayload,
      };

      await transactionController.postCheckoutController(req, res, {});
      td.verify(spy(mockResponseOK));
    });
  });

  describe("#post a transaction", () => {
    it("should throw error", async () => {
      const spy = td.function("spy");
      const errorSpy = td.function("errorSpy");

      td.when(transactionDatabase.postTransaction(mockPayload)).thenThrow(
        new Error("Bad Connection")
      );

      const res = {
        send: spy,
      };

      const req = {
        body: mockPayload,
      };

      await transactionController.postCheckoutController(req, res, errorSpy);
      td.verify(errorSpy(td.matchers.anything()));
    });
  });
});
