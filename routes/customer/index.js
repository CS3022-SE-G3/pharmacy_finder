const routes = require('express').Router();

routes.use('/account', require('./account'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/signup', require('./signup'));

module.exports = routes;