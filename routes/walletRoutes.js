const express = require("express");
const router = express.Router();
const walletController = require("../controllers/WalletController");

router.route("/").get(walletController.getWallet);
    // .post(walletController.getWalletbyUsername);
router.route("/create").post(walletController.insertWallet);
router.route("/:id").delete(walletController.deleteWallet);
module.exports = router;