const routes = require('express').Router();
const path = require('path');
const ifLoggedIn = require('../middleware/ifLoggedIn');
const express = require('express');

// URL upto here - localhost:3000/customer/signup
routes.use('/customer', require('./customer'));
routes.use('/pharmacy', require('./pharmacy'));
routes.use('/system_admin', require('./system_admin'));

routes.use(express.static('./public'));

routes.get('/logout', ifLoggedIn, (req, res) => {
    req.session.destroy();
    console.log("Logged out");
    res.redirect('/');
});

routes.use('/', (request, response) => {
    return response.render("home_page");
});


module.exports = routes;