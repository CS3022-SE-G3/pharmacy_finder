

const routes = require('express').Router();

routes.use('/customer', require('./customer'));
routes.use('/drug', require('./drug'));
routes.use('/drug_type', require('./drug_type'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/report', require('./report'));

module.exports = routes;