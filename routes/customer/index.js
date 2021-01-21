const routes = require('express').Router();
const path = require('path');

routes.use('/account', require('./account'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/response', require('./response'));

routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));

routes.use('/', (req, res) => {
    return res.render('/customer/home.html');
});


module.exports = routes;