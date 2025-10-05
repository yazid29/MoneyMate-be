const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.route("/")
    .get(categoryController.getCategories)
    // .post(categoryController.getWalletbyUsername);
router.route("/create").post(categoryController.insert);
router.route("/:id").put(categoryController.updateCategories);
router.delete('/:id', categoryController.deleteCategoryController);


module.exports = router;