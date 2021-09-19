const handler = async (err, req, res, next) => {
  if (err.message === "items/nonexistent") {
    res.status(404).send("Items with category ID specified is nonexistent");
    return;
  }
  res.status(500).send(err.message);
};

module.exports = { handler };
