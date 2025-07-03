const express = require("express");
const path = require("path");
const router = express.Router();
const authModel = require("../controllers/AuthController");
router.get("/", (req, res) => {
    authModel.connectionDB(req, res);
});

module.exports = router;