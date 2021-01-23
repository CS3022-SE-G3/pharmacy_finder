const express = require('express');
const router = express.Router();
const path = require('path');
const { signupPharmacy } = require('../../controllers/pharmacy/signup');
const bodyParser = require('body-parser');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');

// URL: localhost3000/pharmacy/signup, method is GET
router.get('/', ifNotLoggedIn, (request, response) => {
        return response.sendFile(path.join(__dirname, '../../views/pharmacy/pharmacy_signup.html'));

});

// URL: localhost3000/pharmacy/signup, method is POST
router.post('/', ifNotLoggedIn, signupPharmacy);

module.exports = router;