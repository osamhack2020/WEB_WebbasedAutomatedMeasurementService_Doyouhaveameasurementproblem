const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./routes");
const port = process.env.PORT || 2020;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
