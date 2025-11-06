const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const route = require('./routes/clients/index.route');
const routeAdmin = require('./routes/admin/index.route');

const systemConfig = require('./config/system');

const database =  require('./config/database');
database.connect();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('keyboard cat'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use(methodOverride('_method'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

//Route
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
