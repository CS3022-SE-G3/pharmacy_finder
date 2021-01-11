const routes = require('express').Router();
const pharmacy = require('./pharmacy');
const customer = require('./customer');
const system_admin = require('./system_admin');

routes.use('/customer', customer)
routes.use('/pharmacy', pharmacy)
routes.use('/system_admin', system_admin)

module.exports = routes;