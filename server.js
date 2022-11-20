const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const envelopesRouter = require("./routes/envelopes");
const cors = require("cors");
const logger = require("morgan");

const PORT = process.env.PORT || 5008;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/envelopes", envelopesRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
