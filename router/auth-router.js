const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const productControllers = require("../controllers/product-controller");

router.route("/").get(authControllers.home);
router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/allproducts").get(productControllers.getProducts);

module.exports = router;
