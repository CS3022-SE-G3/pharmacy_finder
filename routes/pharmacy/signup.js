const express = require('express');
const router = express.Router();
const path = require('path');
const { signupPharmacy } = require('../../controllers/pharmacy/signup');
const bodyParser = require('body-parser');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');

// URL: localhost3000/pharmacy/signup, method is GET
router.get('/', ifNotLoggedIn, (request, response) => {
    response.render('pharmacy/signup');
});

// URL: localhost3000/pharmacy/signup, method is POST
router.post('/', ifNotLoggedIn, signupPharmacy);

module.exports = router;