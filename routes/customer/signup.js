const express = require('express');
const router = express.Router();
const path = require('path');
const { signupCustomer } = require('../../controllers/customer/signup');

/**
 * @description returns sign up form for customer
 * @URL localhost:3000/customer/signup
 * @method GET
 */
router.get('/', (request, response) => {
    return response.render('customer/signup');
});

/**
 * @description information entered in sign up form is obtained from customer
 * @URL localhost:3000 / customer / signup
 * @method POST
 */
router.post('/', signupCustomer);


module.exports = router;