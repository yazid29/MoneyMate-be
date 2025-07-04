const express = require("express");
const router = express.Router();
const walletController = require("../controllers/WalletController");

router.route("/")
    .get(walletController.getWallet)
    .post(walletController.getWalletbyUsername);


module.exports = router;