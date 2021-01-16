// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');
const { loginCustomer } = require('../../controllers/customer/login');

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../views/customer/login.html'));
});

router.post('/', ifNotLoggedIn, loginCustomer);

module.exports = router;