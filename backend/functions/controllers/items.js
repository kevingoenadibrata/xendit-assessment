const { getItemsByCategoryId } = require("../database/categories");

const getItemsByCategoryController = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await getItemsByCategoryId(categoryId);
    res.send(result);
  } catch (e) {
    return next(e);
  }
};

module.exports = { getItemsByCategoryController };
