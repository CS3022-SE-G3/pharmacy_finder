const routes = require('express').Router();
const isACustomer = require('../../middleware/isACustomer');
const { viewAllRequests } = require('../../controllers/customer/request');

routes.use('/profile', require('./profile'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));


routes.use('/home', isACustomer, viewAllRequests);

module.exports = routes;