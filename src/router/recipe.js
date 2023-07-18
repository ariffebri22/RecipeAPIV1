const { getData, getDataById, deleteDataById, postData, putData } = require("../controller/RecipeController");
const express = require("express");
const router = express.Router();

router.get("/", getData);
router.post("/", postData);
router.put("/:id", putData);
router.get("/:id", getDataById);
router.delete("/:id", deleteDataById);

module.exports = router;
