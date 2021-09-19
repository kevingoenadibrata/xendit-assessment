const assert = require("assert");

const td = require("testdouble");

let itemsDatabase, itemsController;
const mockItems = [
  {
    name: "Item A",
    price: 123,
    imagePath: "gs://test/a",
  },
  {
    name: "Item B",
    price: 123,
    imagePath: "gs://test/b",
  },
  {
    name: "Item C",
    price: 123,
    imagePath: "gs://test/c",
  },
];

const mockCategoryId = "TESTCATEGORY";
const mockBadCategoryId = "BADCATEGORY";

describe("Items", () => {
  beforeEach(() => {
    itemsDatabase = td.replace("../database/categories");
    td.when(itemsDatabase.getItemsByCategoryId(mockCategoryId)).thenResolve(
      mockItems
    );
    td.when(itemsDatabase.getItemsByCategoryId(mockBadCategoryId)).thenThrow(
      new Error("Bad Category")
    );
    itemsController = require("../controllers/items");
  });

  afterEach(() => {
    td.reset();
  });

  describe("#get items by category id", () => {
    it("should return 3 item objects", async () => {
      const spy = td.function("spy");

      const res = {
        send: spy,
      };

      const req = {
        params: {
          categoryId: mockCategoryId,
        },
      };

      await itemsController.getItemsByCategoryController(req, res, {});
      td.verify(spy(mockItems));
    });
  });

  describe("#get items by invalid category id", () => {
    it("should throw error", async () => {
      const spy = td.function("spy");
      const errorSpy = td.function("errorSpy");

      const res = {
        send: spy,
      };

      const req = {
        params: {
          categoryId: mockBadCategoryId,
        },
      };

      await itemsController.getItemsByCategoryController(req, res, errorSpy);
      td.verify(errorSpy(td.matchers.anything()));
    });
  });
});
