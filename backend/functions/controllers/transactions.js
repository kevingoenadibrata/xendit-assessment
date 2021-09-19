const { postTransaction } = require("../database/transactions");

const postCheckoutController = async (req, res, next) => {
  try {
    const payload = req.body;
    await postTransaction(payload);
    res.send("OK");
  } catch (e) {
    return next(e);
  }
};

module.exports = { postCheckoutController };
