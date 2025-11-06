const express = require('express');
const router = express.Router();
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter()});

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:prod_id", controller.changeStatus);

router.delete("/delete/:prod_id", controller.deleteProduct);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'), validate.createPost, controller.submitCreate);

router.get("/edit/:prod_id", controller.edit);

router.patch("/edit/:prod_id", upload.single('thumbnail'), validate.createPost, controller.submitEdit);

router.get("/detail/:prod_id", controller.detail);

module.exports = router;