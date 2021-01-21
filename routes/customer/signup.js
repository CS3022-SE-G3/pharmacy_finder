const express = require('express');
const router = express.Router();
const path = require('path');
const { signupCustomer } = require('../../controllers/customer/signup');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');


/**
 * @description returns sign up form for customer
 * @URL localhost:3000/customer/signup
 * @method GET
 */
router.get('/', ifNotLoggedIn, (request, response) => {
    return response.render('/customer/signup');
});

/**
 * @description information entered in sign up form is obtained from customer
 * @URL localhost:3000 / customer / signup
 * @method POST
 */
router.post('/', ifNotLoggedIn, signupCustomer);


module.exports = router;