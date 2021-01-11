const routes = require('express').Router();

const account = require('./account');
const pharmacy = require('./pharmacy');
const request = require('./request');

routes.use('/account', account);
routes.use('/pharmacy', pharmacy);
routes.use('/request', request);

module.exports = routes;