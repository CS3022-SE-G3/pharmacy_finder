const routes = require('express').Router();
const path = require('path');

// URL upto here - localhost:3000/customer/signup
routes.use('/customer', require('./customer'))
routes.use('/pharmacy', require('./pharmacy'))
routes.use('/system_admin', require('./system_admin'))

routes.use('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../views/home.html'));
})
module.exports = routes;