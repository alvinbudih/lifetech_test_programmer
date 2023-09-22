const express = require('express');
const cors = require("cors");
const users = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);

app.use(errorHandler);

app.listen(port, () => {
  console.clear();
  console.log(`Example app listening on port ${port}`);
});