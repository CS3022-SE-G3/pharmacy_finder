const routes = require('express').Router();
const isACustomer = require('../../middleware/isACustomer');
const { viewAllRequests } = require('../../controllers/customer/request');


routes.use('/account', require('./account'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/response', require('./response'));

routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));


routes.use('/', isACustomer, viewAllRequests);

module.exports = routes;