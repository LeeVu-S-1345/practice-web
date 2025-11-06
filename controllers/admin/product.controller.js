const Product = require('../../model/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const systemConfig = require('../../config/system');

module.exports.index = async (req, res) => {
    let find = {};

    const filterStatus = filterStatusHelper(req.query);
    const keyword = searchHelper(req.query);

    if (keyword) {
        find.name = keyword;
    };
    
    if (req.query.status) {
        find.status = req.query.status;
    };

    //Pagination
    find.limit = 6; //Items per page
    find.pageCurrent = 1;
    const totalPages = await paginationHelper(req.query, find);
    //End pagination

    const products = await Product.getFilteredProducts(find);

    res.render("admin/pages/products/index", {
        titlePage: "Products",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: {totalPages: totalPages, pageCurrent: find.pageCurrent}
    });
};

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const prodId = req.params.prod_id;
    
    await Product.updateStatus(prodId, status);
    req.flash('success', "Status updated successfully!");
    res.redirect(req.get('Referer') || '/');
};

module.exports.deleteProduct = async (req, res) => {
    const id = req.params.prod_id;
    await Product.delete(id); //Delete forever
    req.flash('success', "Delete successfully!");
    res.redirect(req.get('Referer') || '/');
};

module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        titlePage: "Add a product"
    });
};

module.exports.submitCreate = async (req, res) => {
    req.body.id = parseInt(req.body.id);
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProducts = await Product.count();
        req.body.position = parseInt(countProducts) + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await Product.create(req.body);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {
    try {
        const find = {
        id: req.params.prod_id
    };
    const [product] = await Product.getFilteredProducts(find);
    console.log(product);
    product.price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    res.render("admin/pages/products/edit", {
        titlePage: "Edit products",
        product: product
    });
    } catch(error) {
        res.flash("error", "This product does not exist!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

module.exports.submitEdit = async (req, res) => {
    req.body.id = parseInt(req.body.id);
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.update(req.body);
        req.flash("success", "Update successfully!");
    } catch(error) {
        req.flash("error", "Failed updation!");
    }
    res.redirect(req.get('Referer') || '/');
}

module.exports.detail = async (req, res) => {
    try {
        const find = {
        id: req.params.prod_id
    };
    const [product] = await Product.getFilteredProducts(find);
    console.log(product);
    // product.price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

    res.render("admin/pages/products/detail", {
        titlePage: product.name,
        product: product
    });
    } catch(error) {
        res.flash("error", "This product does not exist!");
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};