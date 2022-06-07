const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

// const { PORT = 3000, DB_HOST } = process.env;

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
