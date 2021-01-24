const routes = require('express').Router();
const isACustomer = require('../../middleware/isACustomer');
const { viewAllRequests } = require('../../controllers/customer/request');

routes.use('/profile', require('./profile'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));
const { reportPharmacy } = require('../../controllers/customer/report');

routes.use('/home', isACustomer, viewAllRequests);

routes.use('/report', isACustomer, reportPharmacy);


module.exports = routes;