const routes = require('express').Router();
const path = require('path');
const isACustomer = require('../../middleware/isACustomer');

routes.use('/account', require('./account'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/request', require('./request'));
routes.use('/response', require('./response'));

routes.use('/signup', require('./signup'));
routes.use('/login', require('./login'));
routes.use('/entry', require('./entry'));


routes.use('/',isACustomer, (req, res) => {
    return res.render('customer/home');
});


module.exports = routes;