const assert = require("assert");

const td = require("testdouble");

let categoriesDatabase, categoriesController;
const mockCategories = ["Category A", "Category B", "Category C"];

describe("Categories", () => {
  beforeEach(() => {
    categoriesDatabase = td.replace("../database/categories");
    td.when(categoriesDatabase.getCategoriesList()).thenResolve(mockCategories);
    categoriesController = require("../controllers/categories");
  });

  afterEach(() => {
    td.reset();
  });

  describe("#get all categories", () => {
    it("should return 3 categories", async () => {
      const spy = td.function("spy");
      td.when(spy()).thenReturn("YEY");

      const res = {
        send: spy,
      };

      await categoriesController.getCategoriesListController({}, res, {});
      td.verify(spy(mockCategories));
    });
  });

  describe("#get items but bad server to firebase connection", () => {
    it("should throw error", async () => {
      const spy = td.function("spy");
      const errorSpy = td.function("errorSpy");

      td.when(categoriesDatabase.getCategoriesList()).thenThrow(
        new Error("Bad Connection")
      );

      const res = {
        send: spy,
      };

      await categoriesController.getCategoriesListController({}, res, errorSpy);
      td.verify(errorSpy(td.matchers.anything()));
    });
  });
});
