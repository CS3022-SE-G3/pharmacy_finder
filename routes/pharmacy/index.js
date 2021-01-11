const routes = require('express').Router();

const account = require('./account');
const drug = require('./drug');
const request = require('./request');

routes.use('/account', account);
routes.use('/drug', drug);
routes.use('/request', request);

module.exports = routes;