const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

// const { PORT = 3000, DB_HOST } = process.env;

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose
  .connect(uriDb)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server is on port ${PORT}`);
  })
  .catch((error) => {
    console.log("ERROR", error);
    process.exit(1);
  });
