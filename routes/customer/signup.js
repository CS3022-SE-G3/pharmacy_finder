const express = require('express');
const router = express.Router();
const path = require('path');
const { signupCustomer } = require('../../controllers/customer/signup');

// URL: localhost3000/customer/signup, method is GET
router.get('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../../views/customer/signup.html'));
});

// URL: localhost3000/customer/signup, method is POST
router.post('/', signupCustomer);


module.exports = router;