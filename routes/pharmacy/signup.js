const express = require('express');
const router = express.Router();
const path = require('path');
const { signupPharmacy } = require('../../controllers/pharmacy/signup');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

// URL: localhost3000/pharmacy/signup, method is GET
router.get('/', (request, response) => {
    response.render('pharmacy/signup');
});

// URL: localhost3000/customer/signup, method is POST
// router.post('/', signupPharmacy);

module.exports = router;