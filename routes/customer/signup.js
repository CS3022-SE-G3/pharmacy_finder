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
router.get('/', (request, response) => {
        return res.sendFile(path.join(__dirname, '../../views/customer/signup.html'));
});

/**
 * @description information entered in sign up form is obtained from customer
 * @URL localhost:3000 / customer / signup
 * @method POST
 */
router.post('/', ifNotLoggedIn, signupCustomer);


module.exports = router;