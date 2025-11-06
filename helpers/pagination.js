const Product = require('../model/product.model');

module.exports = async (query, find) =>{
    if (query.page) {
        find.pageCurrent = parseInt(query.page);
    };
    
    find.offset = (find.pageCurrent - 1) * find.limit;
    const count = await Product.count(find);
    return Math.ceil(count / find.limit);
}