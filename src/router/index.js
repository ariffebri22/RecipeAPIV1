const app = require("express");
const router = app.Router();
const Recipe = require("./recipe");

router.use("/recipe", Recipe);

module.exports = router;
