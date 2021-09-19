const { getCategoriesList } = require("../database/categories");

const getCategoriesListController = async (req, res, next) => {
  try {
    const result = await getCategoriesList();
    res.send(result);
  } catch (e) {
    return next(e);
  }
};

module.exports = { getCategoriesListController };
