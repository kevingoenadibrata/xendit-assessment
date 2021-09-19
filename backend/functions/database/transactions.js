const { db } = require("./database");

const postTransaction = async (payload) => {
  const transactionsRef = db.collection("transactions");
  const res = await transactionsRef.add(payload);
};

module.exports = { postTransaction };
