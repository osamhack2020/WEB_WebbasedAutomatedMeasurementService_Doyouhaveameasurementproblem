const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const  measure_router = require("./routers/measure.js");
const port = process.env.PORT || 2020;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', measure_router);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
