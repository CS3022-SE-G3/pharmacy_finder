const express = require('express');
const routes = require('../routes');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

module.exports = function (app) {

    app.use(express.json());

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());
    app.use(bodyParser.json());

    app.use('/', routes);
}