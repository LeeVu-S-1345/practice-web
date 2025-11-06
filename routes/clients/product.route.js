const express = require('express');
const router = express.Router();

const controller = require("../../controllers/clients/product.controller");

router.get("/", controller.index);

// router.get("/create", (req, res) => {
//     res.render("clients/pages/products/index", {
//         titlePage: "Products",
//         message: "Create products"
//     });
// });

module.exports = router;