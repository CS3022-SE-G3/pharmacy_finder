// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');
const { loginPharmacy } = require('../../controllers/pharmacy/login');

router.get('/', ifNotLoggedIn, (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../../views/pharmacy/login.html'));
});

router.post('/', ifNotLoggedIn, loginPharmacy);

module.exports = router;