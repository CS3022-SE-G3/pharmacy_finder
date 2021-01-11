const routes = require('express').Router();

routes.use('/customer', require('./customer'))
routes.use('/pharmacy', require('./pharmacy'))
routes.use('/system_admin', require('./system_admin'))

module.exports = routes;