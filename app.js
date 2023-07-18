const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Router = require("./src/router");

const port = 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "server running" });
});

app.use(Router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
