const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const { json } = require("body-parser");
const { getItemsByCategoryController } = require("./controllers/items.js");
const { getCategoriesListController } = require("./controllers/categories.js");
const { postCheckoutController } = require("./controllers/transactions.js");
const error = require("./errors/handler");
const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/categories/:categoryId", getItemsByCategoryController);
app.get("/categories", getCategoriesListController);
app.post("/checkout", postCheckoutController);

app.use(error.handler);

// API handler
exports.api = functions.https.onRequest(app);
