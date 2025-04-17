const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const loginRouter = require("./login/router");
const postRouter = require('./post/router')

app.use("/api/login", loginRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
