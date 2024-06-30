const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
require("./config/db");
const userRouter = require("./routes/userRouter");

app.use(bodyParser.json());
app.use(morgan());

//cors
app.use(cors());

//Routes
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`listening on port : http://localhost:${port}`);
});
