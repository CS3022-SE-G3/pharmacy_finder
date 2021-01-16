const routes = require('express').Router();
const path = require('path');
const ifLoggedIn = require('../middleware/ifLoggedIn');

// URL upto here - localhost:3000/customer/signup
routes.use('/customer', require('./customer'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/system_admin', require('./system_admin'));

routes.get('/logout', ifLoggedIn, (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/logout.html'));
});

routes.post('/logout', ifLoggedIn, (req, res) => {
    req.session.destroy();
    console.log("Logged out");
    res.redirect('/');
});

routes.use('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../views/home.html'));
});


module.exports = routes;