const express = require('express');
const router = express.Router();
const path = require('path');
const { signupPharmacy } = require('../../controllers/pharmacy/signup');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

// URL: localhost3000/pharmacy/signup, method is GET
router.get('/', (request, response) => {
    response.render('pharmacy/signup');
});

// URL: localhost3000/pharmacy/signup, method is POST
router.post('/', urlencodedParser, signupPharmacy);

module.exports = router;