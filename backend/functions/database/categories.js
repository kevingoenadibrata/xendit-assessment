const { db } = require("./database");

const getCategoriesList = async () => {
  const categoriesRef = db.collection("categories");
  const snapshot = await categoriesRef.get();
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

const getItemsByCategoryId = async (id) => {
  const itemsRef = db.collection("categories").doc(id).collection("items");
  const snapshot = await itemsRef.get();
  if (snapshot.docs.length === 0) throw new Error("items/nonexistent");
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
};

module.exports = { getCategoriesList, getItemsByCategoryId };
