const Product = require('../../model/product.model');

module.exports.index = async (req, res) => {
    find={};
    const products = await Product.getFilteredProducts(find);

    //console.log(products);

    res.render("clients/pages/products/index", {
        titlePage: "Products",
        product: products
    });
}