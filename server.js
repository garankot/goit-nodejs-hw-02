const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
