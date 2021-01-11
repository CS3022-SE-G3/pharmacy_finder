const express = require('express');
const routes = require('../routes');

module.exports = function (app) {

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));

    app.use('/', routes);
}