const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 5008;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
