const routes = require('express').Router();

routes.use('/account', require('./account'));
routes.use('/drug', require('./drug'));
routes.use('/addDrug', require('./addDrug'));
routes.use('/request', require('./request'));
routes.use('/signup', require('./signup'));


module.exports = routes;