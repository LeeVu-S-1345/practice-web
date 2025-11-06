const systemConfig = require("../../config/system");
const productRoute = require("./product.route");
const dashboardRoute = require("./dashboard.route");

module.exports = (app) => {
    const ADMIN_PATH = systemConfig.prefixAdmin;
    app.use(ADMIN_PATH + '/dashboard', dashboardRoute);
    app.use(ADMIN_PATH + '/products', productRoute);
}