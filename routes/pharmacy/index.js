const routes = require('express').Router();


const account = require('./account');
const drug = require('./drug');
const request = require('./request');

routes.use('/account', require('./account'));
routes.use('/drug', require('./drug'));
routes.use('/request', require('./request'));

module.exports = routes;