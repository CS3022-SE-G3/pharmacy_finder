const routes = require('express').Router();

routes.use('/account', require('./account'));
routes.use('/drug', require('./drug'));
routes.use('/addDrug', require('./addDrug'));
routes.use('/response', require('./response'));
routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));
routes.use('/home', require('./home'));


module.exports = routes;